// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

export function py2ast(code: string) {

    const parser = new $B.Parser(code, "filename", 'file');
	const _ast = $B._PyPegen.run_parser(parser);
    console.log("AST", _ast);

	return convert_ast(_ast);   
}

function convert_ast(ast: any): ASTNode[] {

	return ast.body.map( (line:any) => {
		return new ASTNode(line);
	});
}