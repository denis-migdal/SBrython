import { Context, convert_node, list2astnode } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const lines = new Array(node.length)
    for(let i = 0; i < node.length; ++i)
        lines[i] = convert_node(node[i], context);

    return new ASTNode(list2astnode(node), "body", null, null, lines);
}

convert.brython_name = "Body";