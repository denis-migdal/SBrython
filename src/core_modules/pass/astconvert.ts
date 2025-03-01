import { set_py_code } from "ast2js";
import { PASS } from "core_modules/lists";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {
    
    const ast = new ASTNode(PASS);
        
    set_py_code(4*ast.id, node);

    return ast;
}


convert.brython_name = "Pass";