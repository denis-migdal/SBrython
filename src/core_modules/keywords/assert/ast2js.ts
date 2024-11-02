import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    return wt`_b_.assert(${this.children[0]})`;
}