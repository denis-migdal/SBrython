import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "operators.[]", null, null,
        [
            convert_node(node.value, context),
            convert_node(node.slice, context)
        ]
    );
}

convert.brython_name = ["Subscript"];