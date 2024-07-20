import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {


    return new ASTNode(node, "keywords.raise", null, null, [
        convert_node(node.exc, context)
    ]);
}

convert.brython_name = "Raise";