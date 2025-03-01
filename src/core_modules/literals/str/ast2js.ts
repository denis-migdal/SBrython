import { w, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {
    wt`'${VALUES[node.id]}'`;
}