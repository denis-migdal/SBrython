import { w, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    const value = VALUES[node.id];

    if( value[1] === undefined)
        return w(value[0]);

    wt`${value[0]}: ${value[1]}`;
}