import { wr } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";

export default function ast2js(this: ASTNode) {

    let left  = this.children[0];
    let right = this.children[1];

    const method = left.result_type![this.value] as STypeFctSubs;

    wr( method.substitute_call!(this, left, right) );
}