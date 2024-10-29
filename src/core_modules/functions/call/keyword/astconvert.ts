import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const value    = convert_node(node.value, context )
    const ret_type = value.result_type;

    return new ASTNode(node, "functions.keyword", ret_type, node.arg, [
        value
    ]);
}

convert.brython_name = "keyword";