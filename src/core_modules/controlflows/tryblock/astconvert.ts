import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( "tryblock" in node ) {

        if( node.tryblock === "try") {
            return new ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
                convert_body(node, context)
            ]);
        }
        if( node.tryblock === "catchblock") {
            console.log("cb", node);
            return new ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
                convert_body(node, context)
                /* this.handlers */ //TODO...
            ]);
        }
    }

    node.sbrython_type = "Try";
    node.tryblock = "try";

    //TODO many excepts...
    const catchblock = {
        sbrython_type: "Try",
        tryblock     : "catchblock",
        ...node.handlers[0] //TODO...
    };


    const children = [
        node,
        catchblock
    ];


    const astnode = new ASTNode(node, "controlflows.tryblock", null, null, [
        ...children.map( n => convert_node(n, context) )
    ]);

    //TODO: for first child...
    /*
    for(let i = 0; i < astnode.children.length-1; ++i) {
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length-1].pycode.end;
    }*/

    console.log(node);
    return astnode;

    // node.body
    // final.body // orelse
    // handlers []
/*
    if( "ifblock" in node ) {

        if( node.ifblock === "else") {
            return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
                convert_body(node, context)
            ]);
        }

        const cond = convert_node(node.test, context);
        
        if(cond.result_type !== "bool")
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

        let beg = cur.orelse[0];
        let end = cur.orelse[cur.orelse.length-1];

        children.push({
            sbrython_type: "If",
            ifblock: "else",
            body   : cur.orelse,
            lineno : beg.lineno - 1,
            col_offset: node.col_offset,
            end_lineno: end.end_lineno,
            end_col_offset: end.end_col_offset,
        })
    }

    const astnode = new ASTNode(node, "controlflows.ifblock", null, null, [
            ...children.map( n => convert_node(n, context) )
        ]);
    
    for(let i = 0; i < astnode.children.length-1; ++i) {
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length-1].pycode.end;
    }

    return astnode;*/
}

convert.brython_name = "Try";