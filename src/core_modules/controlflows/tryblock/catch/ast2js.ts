import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    // else is handled by tryblock

    if(node.children.length === 1)
        return wt`{${node.children[0]},${NL}}`;

    wt`if(${node.children[0]}){${node.children[1]}${NL}}`;
}