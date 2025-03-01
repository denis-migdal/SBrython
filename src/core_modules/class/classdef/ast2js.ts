import { NL, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    let base: string|ASTNode = "_r_.object";
    let body = node.children[0];
    if( node.children.length === 2) {
        base = node.children[0];
        body = node.children[1];
    }

    wt`class ${VALUES[node.id]} extends ${base} {${body}${NL}}`;
}