import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";
import { STYPE_INT, STYPE_JSINT } from "structs/STypes";

export default function ast2js(node: ASTNode) {
    
    w("var ");

    w(node.children[0]);
    
    for(let i = 1; i < node.children.length - 1; ++i)
        wt` = ${node.children[i]}`;

    const right_node = node.children[node.children.length-1];
    let rchild: any = right_node;

    if( right_node.result_type === STYPE_JSINT && node.result_type === STYPE_INT )
        rchild = Number2Int(right_node);

    wt` = ${rchild}`;
}