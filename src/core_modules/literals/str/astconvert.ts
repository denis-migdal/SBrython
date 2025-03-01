import { set_py_code } from "ast2js";
import { LITERALS_STR } from "core_modules/lists";
import { VALUES } from "dop";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STYPE_STR } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "string")
        return;

    const ast = new ASTNode(LITERALS_STR, STYPE_STR);

    VALUES[ast.id] = node.value;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Constant";