import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( ! (node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float")
        return;

    return new ASTNode(node, "literals.float", "float", node.value.value);
}