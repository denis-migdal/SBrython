import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const left  = convert_node(node.left , context );
    const right = convert_node(node.right, context);

    let type = null;
    if( left.result_type === right.result_type)
        type = left.result_type;

    //TODO...
    return new ASTNode(node, "operators.+", type, null,
        [
            left,
            right
        ]
    );
}