// Brython must be imported before.
declare var $B: any;

import {ASTNode} from "./structs/ASTNode";

//TODO: use genlist
import C1 from "./core_modules/operators/astconvert";
import C2 from "./core_modules/int/astconvert";
import C3 from "./core_modules/fctcall/astconvert";
import C4 from "./core_modules/symbol/astconvert";
import C5 from "./core_modules/ifblock/astconvert";
import C6 from "./core_modules/bool/astconvert";
import C7 from "./core_modules/operator.==/astconvert";
import C8 from "./core_modules/operator.=/astconvert";
import C9 from "./core_modules/None/astconvert";

const AST_CONVERT = [
    C1,
    C2,
    C3,
    C4,
    C5,
    C6,
    C7,
    C8,
    C9
]
//TODO: use genlist
import A1 from "./core_modules/operators/ast2js";
import A2 from "./core_modules/int/ast2js";
import A3 from "./core_modules/fctcall/ast2js";
import A4 from "./core_modules/symbol/ast2js";
import A5 from "./core_modules/ifblock/ast2js";
import A6 from "./core_modules/bool/ast2js";
import A7 from "./core_modules/operator.==/ast2js";
import A8 from "./core_modules/operator.=/ast2js";
import A9 from "./core_modules/None/ast2js";

const AST2JS = [
    A1,
    A2,
    A3,
    A4,
    A5,
    A6,
    A7,
    A8,
    A9
]

export function py2ast(code: string) {

    const parser = new $B.Parser(code, "filename", 'file');
	const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);

	return convert_ast(_ast);   
}

export function convert_node(brython_node: any, context: Context): ASTNode {

    //console.log("N", brython_node);

    for(let i = 0; i < AST_CONVERT.length; ++i) {
        let result = AST_CONVERT[i](brython_node, context);
        if(result !== false) {
            result.toJS = AST2JS[i];
            return result;
        }
    }
    
    console.error(brython_node);
    throw new Error("Unsupported node");
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

	return ast.body.map( (line:any) => convert_line(line,context) );
}