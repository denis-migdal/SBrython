import { Context, convert_body, convert_node, listpos } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_bool } from "structs/STypes";

export default function convert(node: any, context: Context) {

    if( "ifblock" in node ) {

        if( node.ifblock === "else") {
            return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
                convert_body(node, context)
            ]);
        }

        const cond = convert_node(node.test, context);
        
        if(cond.result_type !== SType_bool)
            throw new Error(`Type ${cond.result_type} not yet supported as if condition`);

        return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
            cond,
            convert_body(node, context)
        ]);
    }

    node.sbrython_type = "If";
    node.ifblock = "if";

    const children = [
        node
    ];

    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]) {
        cur = cur.orelse[0];
        cur.sbrython_type = "If";
        cur.ifblock = "elif";
        children.push(cur);
    }
    if( "orelse" in cur && cur.orelse.length !== 0 ) { // else

        children.push({
            sbrython_type: "If",
            ifblock: "else",
            body   : cur.orelse,
            ...listpos(cur.orelse),
            // because reasons...
            lineno    : cur.orelse[0].lineno - 1,
            col_offset: node.col_offset,
        })
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

convert.brython_name = "If";