import { set_py_code } from "ast2js";
import { LITERALS_FLOAT } from "core_modules/lists";
import { VALUES } from "dop";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STYPE_FLOAT } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( ! (node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float")
        return;

    const ast = new ASTNode(LITERALS_FLOAT, STYPE_FLOAT);
    
    VALUES[ast.id] = node.value.value;
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Constant";