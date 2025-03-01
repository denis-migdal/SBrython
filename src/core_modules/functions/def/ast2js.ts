import { NL, w, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    const name = VALUES[node.id];
    const args = node.children[0];
    const body = node.children[1];

    wt`function ${name}(${args}){${body}${NL}}`;
    //w('function ', name, '(', args, '){', body, NL, '}');
}