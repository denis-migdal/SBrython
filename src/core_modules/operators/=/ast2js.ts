import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";
import { SType_int, SType_jsint } from "structs/STypes";

export default function ast2js(this: ASTNode) {
    
    if( this.type.endsWith("(init)") )
        w("var ");

    w(this.children[0]);
    
    for(let i = 1; i < this.children.length - 1; ++i)
        wt` = ${this.children[i]}`;

    const right_node = this.children[this.children.length-1];
    let rchild: any = right_node;

    if( right_node.result_type === SType_jsint && this.result_type === SType_int )
        rchild = Number2Int(right_node);

    wt` = ${rchild}`;
}