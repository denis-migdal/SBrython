import { Context, convert_body, convert_line, convert_node, listpos } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const children = [
        {
            sbrython_type: "Try.try",
            ...node
        },
        {
            sbrython_type: "Try.catchblock",
            ...listpos(node.handlers),
            handlers: node.handlers
        }
    ];

    const astnode = new ASTNode(node, "controlflows.tryblock", null, null, [
        ...children.map( n => convert_node(n, context) )
    ]);

    //fix pycode.
    astnode.children[0].pycode.end = astnode.children[1].pycode.start;

    return astnode;
}

convert.brython_name = "Try";