import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("test" in node) )
        return;

    console.log(node);

    if( node.ifblock === "if" || node.ifblock === "elif" ) {

        const cond = convert_node(node.test, context);
        
        if(cond.result_type !== "bool")
            throw new Error(`Type ${cond.result_type} not yet supported as if condition`);

        return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
            cond,
            ...convert_body(node, context)
        ]);
    }

    node.ifblock = "if";

    const children = [
        node
    ];

    let cur = node; // else is different
    while( "orelse" in cur && cur.orelse.length > 0) {

        // if test = elif / no test = else.
        cur = cur.orelse[0];
        cur.ifblock = "elif";
        children.push(cur);
    }

    const astnode = new ASTNode(node, "controlflows.ifblock", null, null, [
            ...children.map( n => convert_node(n, context) )
        ]);
    
    for(let i = 0; i < astnode.children.length-1; ++i) {
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length-1].pycode.end;
    }

    return astnode;
}