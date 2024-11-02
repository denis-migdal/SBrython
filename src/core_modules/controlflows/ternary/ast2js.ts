import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    const cond     = this.children[0];
    const if_true  = this.children[1];
    const if_false = this.children[2];

    wt`(${cond} ? ${if_true} : ${if_false})`;
}