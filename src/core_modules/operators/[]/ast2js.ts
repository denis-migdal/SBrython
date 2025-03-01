import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {
    
    wt`${node.children[0]}[${node.children[1]}]`;
}