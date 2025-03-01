import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    return wt`_b_.assert(${node.children[0]})`;
}