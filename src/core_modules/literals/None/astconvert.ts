import { set_py_code } from "ast2js";
import { LITERALS_NONE } from "core_modules/lists";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STYPE_NONETYPE } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( ! (typeof node.value === "object")
            || !("__class__" in node.value)
            || node.value.__class__.__qualname__ !== "NoneType" )
        return;

    const ast = new ASTNode(LITERALS_NONE, STYPE_NONETYPE);
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Constant";