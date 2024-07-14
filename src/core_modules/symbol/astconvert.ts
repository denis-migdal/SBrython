import { convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( ! ("id" in node) )
        return false;

    return new ASTNode(node, "symbol", node.id);
}