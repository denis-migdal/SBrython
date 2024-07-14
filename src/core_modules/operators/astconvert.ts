import { convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( ! ("op" in node) )
        return false;

    let op = node.op.constructor.$name;
    if( op === "Add")
        op = "+";

    return new ASTNode(node, "Operator", op,
        [
            convert_node(node.left ),
            convert_node(node.right),
        ]
    );
}