// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

import CORE_MODULES from "./core_modules/lists";
import { SType, STypeFctSubs, STypeObj } from "structs/SType";
import { SType_type_int } from "core_modules/literals/int/stype";
import { SType_type_str } from "core_modules/literals/str/stype";
import { SType_type_float } from "core_modules/literals/float/stype";
import { SType_int } from "structs/STypes";
import { w, wr } from "ast2js";

export type AST = {
    body    : ASTNode,
    filename: string
}

const modules: Record<string, (typeof CORE_MODULES)[keyof typeof CORE_MODULES][]> = {}

for(let module_name in CORE_MODULES) {

    const module = CORE_MODULES[module_name as keyof typeof CORE_MODULES];

    let names = ["null"];
    if( "brython_name" in module.AST_CONVERT) {

        if( Array.isArray(module.AST_CONVERT.brython_name) ) {
            names = module.AST_CONVERT.brython_name;
        } else {
            names = [module.AST_CONVERT.brython_name]
        }
    }

    for(let name of names)
        (modules[name] ??= []).push(module);
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
    return convert_node(ast.body, new Context() );
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

    if( !(name in modules) ) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log( brython_node );
        name = "null"
    }

    // we may have many modules for the same node type.
    for(let module of modules[name]) { 
        const result = module.AST_CONVERT(brython_node, context);
        if(result !== undefined) {
            result.write = module.AST2JS;
            return result;
        }
    }

    console.error(brython_node);
    throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
}

export function list2astnode(node: any[]) {

    const beg = node[0];
    const end = node[node.length-1];

    return {
        lineno        : beg.lineno,
        col_offset    : beg.col_offset,
        end_lineno    : end.end_lineno,
        end_col_offset: end.end_col_offset,
    };
}

export class Context {
    constructor(type: "?"|"class"|"fct" = "?", parent_context: Context = RootContext) {
        this.type = type; //TODO: remove
        this.local_symbols = {...parent_context.local_symbols};
    }
    type; //TODO: remove

    parent_node_context?: ASTNode; 

    local_symbols: Record<string, STypeObj|null>;
}

const type_fct = {} /* fct class => type class */

//TODO: move...
//TODO: binary/unary
//TODO: remove return_type (get from the __{name}__)
function genUnaryOpFct(name: string, return_type: STypeObj) {
    const opname = `__${name}__`;
    return {
        [name]: {
            __class__: type_fct,
            __name__ : name,
            __call__ : {
                //TODO: I need a self...
                return_type    : () => return_type,
                // not really :?
                substitute_call: (call: ASTNode) => {
                    const left = call.children[1];
                    const method = left.result_type![opname] as STypeFctSubs;
                    return method.substitute_call!(call);
                }
            }
        }
    }
}

// builtin symbols.
// @ts-ignore
const RootContext: Context = {
    type: "?" as const,
    local_symbols: {
        int  : SType_type_int,
        str  : SType_type_str,
        float: SType_type_float,
        ...genUnaryOpFct("len", SType_int)

        // add functions like len() / pow() / divmod()
    }
} satisfies Context;
