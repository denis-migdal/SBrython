import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_NoneType } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( ! (typeof node.value === "object")
            || !("__class__" in node.value)
            || node.value.__class__.__qualname__ !== "NoneType" )
        return;

    return new ASTNode(node, "literals.None", SType_NoneType, null);
}

convert.brython_name = "Constant";