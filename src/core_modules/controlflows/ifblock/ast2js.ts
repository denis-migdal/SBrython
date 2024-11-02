import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    // if
    wt`if(${this.children[0]}){${this.children[1]}${NL}}`;

    // else if
    let i;
    for(i = 2; i < this.children.length - 1; i += 2) {
        wt`else if(${this.children[i]}){${this.children[i+1]}${NL}}`;
    }

    // else
    if( i === this.children.length - 1 )
        wt`else {${this.children[i]}${NL}}`;
}