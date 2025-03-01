import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    // if
    wt`if(${node.children[0]}){${node.children[1]}${NL}}`;

    // else if
    let i;
    for(i = 2; i < node.children.length - 1; i += 2) {
        wt`else if(${node.children[i]}){${node.children[i+1]}${NL}}`;
    }

    // else
    if( i === node.children.length - 1 )
        wt`else {${node.children[i]}${NL}}`;
}