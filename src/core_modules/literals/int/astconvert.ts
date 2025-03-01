import { set_py_code } from "ast2js";
import { LITERALS_INT } from "core_modules/lists";
import { VALUES } from "dop";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STYPE_INT, STYPE_JSINT } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    let value = node.value;

    if(value.__class__?.__qualname__ === "int")
        value = value.value;

    if( typeof value !== "number" && typeof value !== "bigint" )
        return;

    const real_type = typeof value !== "number" ? STYPE_INT : STYPE_JSINT;

    const ast = new ASTNode(LITERALS_INT, real_type);
    
    VALUES[ast.id] = value;
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Constant";