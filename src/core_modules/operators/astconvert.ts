import { convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( ! ("op" in node) )
        return false;

    return new ASTNode(node, "Operator", node.op.constructor.$name,
        [
            convert_node(node.left ),
            convert_node(node.right),
        ]
    );
}