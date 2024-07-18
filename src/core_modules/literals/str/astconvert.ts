import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "string")
        return;

    return new ASTNode(node, "literals.str", "str", node.value);
}