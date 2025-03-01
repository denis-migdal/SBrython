import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    const cond = node.children[0];
    const body = node.children[1];

    wt`while(${cond}){${body}${NL}}}`;
}