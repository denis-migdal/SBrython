import { NL, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    const idx  = VALUES[node.id];
    const body = node.children[node.children.length-1];
    const list = node.children[0];

    wt`for(var ${idx} of ${list}){${body}${NL}}`;
}