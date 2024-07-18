import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( Object.keys(node).length !== 4)
        return;

    return new ASTNode(node, "pass", null);
}