import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const children = new Array<ASTNode>(node.handlers.length+1);

    // try body
    children[0] = convert_node(node.body, context);

    for(let i = 0; i < node.handlers; ++i)
        children[i+1] = convert_node(node.handlers[i], context);

    return new ASTNode(node, "controlflows.tryblock", null, null, children);
}

convert.brython_name = "Try";