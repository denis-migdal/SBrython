import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    console.warn(node);

    return new ASTNode(node, "Assert", null, null, [
        convert_node(node.test, context)
    ]);
}

convert.brython_name = "Assert";