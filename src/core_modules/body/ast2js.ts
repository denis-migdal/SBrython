import { BB, BE, NL, w } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    w(BB);

    for(let i = 0; i < node.children.length; ++i)
        w(NL, node.children[i]);

    w(BE);
}