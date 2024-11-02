import { BB, BE, NL, w } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    w(BB);

    for(let i = 0; i < this.children.length; ++i)
        w(NL, this.children[i]);

    w(BE);
}