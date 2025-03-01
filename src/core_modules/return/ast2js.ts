import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    if( node.children.length === 0)
        return w("return null");

    return wt`return ${node.children[0]}`;
}