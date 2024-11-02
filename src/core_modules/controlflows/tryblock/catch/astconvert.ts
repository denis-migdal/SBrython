import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    let children;
    if( node.type !== undefined) {
        children = [convert_node(node.type, context), convert_node(node.body, context)]
    } else {
        children = [ convert_node(node.body, context) ];
    }

    return new ASTNode(node, `controlflows.catch`, null, node.name, children);
}

convert.brython_name = "ExceptHandler";