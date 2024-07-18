import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "controlflows.while", null, null, [
        convert_node(node.test, context),
        convert_body(node, context)
    ]);
}

convert.brython_name = "While";