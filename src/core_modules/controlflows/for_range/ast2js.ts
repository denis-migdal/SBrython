import { NL, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";

export default function ast2js(node: ASTNode) {

    const idx  = VALUES[node.id];
    const body = node.children[node.children.length-1];

    let beg : string|ASTNode|any  = "0n";
    let incr: string|ASTNode|any  = "1n";
    let end  = Number2Int(node.children[0]);

    if( node.children.length > 2) {
        beg = Number2Int(node.children[0]);
        end = Number2Int(node.children[1]);
    }
    if( node.children.length > 3)
        incr = Number2Int(node.children[2]);

    return wt`for(var ${idx} = ${beg}; ${idx} < ${end}; ${idx} += ${incr}){${body}${NL}}`;
}