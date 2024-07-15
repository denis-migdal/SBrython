import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("op" in node) )
        return false;

    let op = node.op.constructor.$name;
    if( op === "Add")
        op = "+";

    if( op === "Eq")
        return false;

    return new ASTNode(node, "Operator", op,
        [
            convert_node(node.left , context ),
            convert_node(node.right, context),
        ]
    );
}