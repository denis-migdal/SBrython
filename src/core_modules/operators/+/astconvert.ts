import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("op" in node) )
        return;

    let op = node.op.constructor.$name;
    if( op === "Add")
        op = "+";

    if( op === "Eq")
        return;

    return new ASTNode(node, "operators.+", op,
        [
            convert_node(node.left , context ),
            convert_node(node.right, context),
        ]
    );
}