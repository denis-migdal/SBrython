import { NL, w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    const name = this.value;
    const args = this.children[0];
    const body = this.children[1];

    wt`function ${name}(${args}){${body}${NL}}`;
    //w('function ', name, '(', args, '){', body, NL, '}');
}