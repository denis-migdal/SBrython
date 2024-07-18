// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

import CORE_MODULES from "./core_modules/lists";

export function py2ast(code: string) {

    const parser = new $B.Parser(code, "filename", 'file');
	const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);

	return convert_ast(_ast);   
}

export function convert_node(brython_node: any, context: Context): ASTNode {

    //console.log("N", brython_node);

    for(let module_name in CORE_MODULES) {
        const module = CORE_MODULES[module_name as keyof typeof CORE_MODULES];
        let result = module.AST_CONVERT(brython_node, context);
        if(result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }

    console.error(brython_node);
    throw new Error("Unsupported node");
}

export function convert_body(node: any, context: Context) {
    return node.body.map( (m:any) => convert_line(m, context) )
}

export function convert_line(line: any, context: Context): ASTNode {

    //TODO: line ASTNode ???

    let node = line;
    if( "value" in line && ! ("targets" in line) && ! ("target" in line) )
        node = line.value;

    return convert_node( node, context );
}

export type Context = {
    local_variables: Record<string, string|null>
}

export function convert_ast(ast: any): ASTNode[] {

    const context = {
        local_variables: Object.create(null)
    }

    const result = new Array(ast.body.length);
    for(let i = 0; i < ast.body.length; ++i) {

        //TODO: detect comments

        result[i] = convert_line(ast.body[i], context);
    }

    //TODO: detect comments...

    return result;
}