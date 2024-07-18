import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const left  = convert_node(node.left, context );
    const right = convert_node(node.comparators[0], context);

    if(left.result_type === null || right.result_type === null) {
        //TODO: object result_type too...
        throw new Error("Not implemented");
    }

    return new ASTNode(node, "operators.==", "bool", null,
        [
            left,
            right,
        ]
    );
}

convert.brython_name = "Compare";