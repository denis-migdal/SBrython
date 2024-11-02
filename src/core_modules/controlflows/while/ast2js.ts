import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    const cond = this.children[0];
    const body = this.children[1];

    wt`while(${cond}){${body}${NL}}}`;
}