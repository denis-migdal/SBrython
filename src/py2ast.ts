// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

//TODO: use genlist
import C1 from "./core_modules/operators/astconvert";
import C2 from "./core_modules/integer/astconvert";

const AST_CONVERT = [
    C1,
    C2
]
//TODO: use genlist
import A1 from "./core_modules/operators/ast2js";
import A2 from "./core_modules/integer/ast2js";

const AST2JS = [
    A1,
    A2
]

export function py2ast(code: string) {

    const parser = new $B.Parser(code, "filename", 'file');
	const _ast = $B._PyPegen.run_parser(parser);
    console.log("AST", _ast);

	return convert_ast(_ast);   
}

export function convert_node(brython_node: any): ASTNode {


    for(let i = 0; i < AST_CONVERT.length; ++i) {
        let result = AST_CONVERT[i](brython_node);
        if(result !== false) {
            result.toJS = AST2JS[i];
            return result;
        }
    }
    
    return new ASTNode(brython_node);
}

function convert_ast(ast: any): ASTNode[] {

	return ast.body.map( (line:any) => {

        return convert_node( line.value );
	});
}