import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    w('{');

    if( node.children.length > 0 )
        wt`${node.children[0]}: ${node.children[1]}`;

    for(let i = 2; i < node.children.length; i+=2)
        wt`, ${node.children[i]}: ${node.children[i+1]}`;

    w('}');
}