import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let base: string|ASTNode = "_r_.object";
    let body = this.children[0];
    if( this.children.length === 2) {
        base = this.children[0];
        body = this.children[1];
    }

    wt`class ${this.value} extends ${base} {${body}${NL}}`;
}