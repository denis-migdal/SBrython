import { w, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { STYPE_INT } from "structs/STypes";

export default function ast2js(node: ASTNode) {

    let value = VALUES[node.id];

    if( node.result_type === STYPE_INT ) {
        wt`${value}n`;
        return;
    }
    if( typeof value === "bigint" )
        value = Number(value); // remove useless precision.

    w(value);
}