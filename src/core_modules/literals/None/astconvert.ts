import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( ! (typeof node.value === "object")
            || !("__class__" in node.value)
            || node.value.__class__.__qualname__ !== "NoneType" )
        return false;

    const astnode = new ASTNode(node, "literals.None", null);
    astnode.result_type = "None"
    return astnode;
}