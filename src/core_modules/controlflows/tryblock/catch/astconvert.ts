import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    let children;
    if( node.type !== undefined) {
        children = [convert_node(node.type, context), convert_body(node, context)]
    } else {
        children = [ convert_body(node, context) ];
    }

    return new ASTNode(node, `controlflows.catch`, null, node.name, children);
}

convert.brython_name = "ExceptHandler";