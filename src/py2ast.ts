// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

import { AST_CONVERT } from "./core_modules/lists";
import { STypeFctSubs } from "structs/SType";
import { addSType, getSTypeID, STYPE_FLOAT, STYPE_INT, STYPE_STR, STypes } from "structs/STypes";
import dop_reset from "dop";
import { RET_INT, RETURN_TYPE_FCT } from "structs/ReturnTypeFcts";

export type AST = {
    body    : ASTNode,
    filename: string
}

const modules: Record<string, number[]> = {}

for(let i = 0 ; i < AST_CONVERT.length; ++i) {

    const module = AST_CONVERT[i];

    let names = ["null"];
    if( "brython_name" in module) {

        if( Array.isArray(module.brython_name) )
            names = module.brython_name;
        else
            names = [module.brython_name as string]
    }

    for(let name of names)
        (modules[name] ??= []).push(i);
}

export function py2ast(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
	const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);

	return {
        body: convert_ast(_ast),
        filename
    }
}

export function convert_ast(ast: any): ASTNode {

    dop_reset();

    const result = convert_node(ast.body, new Context() );

    /*function count(node: ASTNode) {

        let sum = 1; // count myself
        for(let i = 0; i < node.children.length; ++i )
            sum += count(node.children[i]);
        return sum;
    }
    console.warn( count(result) );*/

    return result;
}


function getNodeType(brython_node: any): string {

    // likely a body.
    if( Array.isArray(brython_node) )
        return "Body";

    return brython_node.constructor.$name;
}

export function convert_node(brython_node: any, context: Context): ASTNode {

    let name = getNodeType(brython_node);

    if(name === "Expr") {
        brython_node = brython_node.value;
        name = getNodeType(brython_node);
    }

    const candidates = modules[name];

    if( candidates === undefined ) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log( brython_node );
        name = "null"
    }

    // we may have many modules for the same node type.
    for(let i = 0; i < candidates.length; ++i) {
        const result = AST_CONVERT[candidates[i]](brython_node, context);
        if(result !== undefined) {
            //const ID = candidates[i];
            //result.type_id = ID;
            return result;
        }
    }

    console.error(brython_node);
    throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
}

export class Context {
    constructor(type: "?"|"class"|"fct" = "?", parent_context: Context = RootContext) {
        this.type = type; //TODO: remove
        this.local_symbols = {...parent_context.local_symbols};
    }

    type; //TODO: remove

    parent_node_context?: ASTNode; 

    local_symbols: Record<string, number>;
}

const type_fct = {} /* fct class => type class */

//TODO: move...
//TODO: binary/unary
//TODO: remove return_type (get from the __{name}__)
function genUnaryOpFct(name: string, return_type: RETURN_TYPE_FCT) {
    const opname = `__${name}__`;
    return {
        __class__: type_fct,
        __name__ : name,
        __call__ : {
            //TODO: I need a self...
            return_type    : return_type,
            // not really :?
            substitute_call: (call: ASTNode) => {
                const left = call.children[1];
                const method = STypes[left.result_type]![opname] as STypeFctSubs;
                return method.substitute_call!(call);
            }
        }
    }
}

//TODO: not a type !!!
const len = addSType("len", genUnaryOpFct("len", RET_INT));

// builtin symbols.
// @ts-ignore
const RootContext: Context = {
    type: "?" as const,
    local_symbols: {
        int  : getSTypeID('type[int]'),
        str  : getSTypeID('type[str]'),
        float: getSTypeID('type[float]'),
        len,

        // add functions like len() / pow() / divmod()
    }
} satisfies Context;