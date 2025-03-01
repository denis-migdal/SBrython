import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    const cond     = node.children[0];
    const if_true  = node.children[1];
    const if_false = node.children[2];

    wt`(${cond} ? ${if_true} : ${if_false})`;
}