import { w } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    w("[");

    if( node.children.length > 0 )
        w(node.children[0]);

    for(let i = 1; i < node.children.length; ++i)
        w(", ", node.children[i]);

    w("])");
}