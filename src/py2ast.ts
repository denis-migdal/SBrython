// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

import CORE_MODULES from "./core_modules/lists";
import { STypeObj } from "structs/SType";
import { SType_float, SType_int, SType_str } from "structs/STypes";


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

    const context = new Context();

    //TODO: builtin_symbols
    //TODO: fix types...

    //@ts-ignore
    context.local_symbols['int']   = SType_int  .__class__;
    //@ts-ignore
    context.local_symbols['str']   = SType_str  .__class__;
    //@ts-ignore
    context.local_symbols['float'] = SType_float.__class__;

    return convert_node(ast.body, context);
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
    constructor(type: "?"|"class"|"fct" = "?", parent_context: Context|null = null) {

        this.type = type;

        this.local_symbols = parent_context === null ? Object.create(null) 
                                                       : {...parent_context.local_symbols}
    }
    type;

    parent_node_context?: ASTNode; 

    local_symbols: Record<string, STypeObj|null>;
}