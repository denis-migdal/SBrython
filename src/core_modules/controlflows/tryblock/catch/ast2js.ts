import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    // else is handled by tryblock

    if(this.children.length === 1)
        return wt`{${this.children[0]},${NL}}`;

    wt`if(${this.children[0]}){${this.children[1]}${NL}}`;
}