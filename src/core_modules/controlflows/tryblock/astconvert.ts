import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( "tryblock" in node ) {

        if( node.tryblock === "try") {
            return new ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
                convert_body(node, context)
            ]);
        }
    }

    node.sbrython_type = "Try";
    node.tryblock = "try";

    const tryblock = { //TODO sub too...
        ...node
    };

    //TODO many excepts...
    const catchblock = {
        sbrython_type: "Try.catchblock",
        tryblock     : "catchblock",
        ...node.handlers[0] //TODO...
    };


    const children = [
        tryblock,
        catchblock
    ];

    const astnode = new ASTNode(node, "controlflows.tryblock", null, null, [
        ...children.map( n => convert_node(n, context) )
    ]);

    astnode.children[0].pycode.end = astnode.children[1].pycode.start;

    return astnode;
}

convert.brython_name = "Try";