import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    // if
    const children = [
        convert_node(node.test, context),
        convert_node(node.body, context)
    ];

    // else if
    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]) {
        cur = cur.orelse[0];

        children.push(
            convert_node(cur.test, context),
            convert_node(cur.body, context)
        )
    }
    // else
    if( "orelse" in cur && cur.orelse.length !== 0 )
        children.push( convert_node(cur.orelse, context) );

    return new ASTNode(node, "controlflows.ifblock", null, null, children);
}

convert.brython_name = "If";