import { wr } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { STypes } from "structs/STypes";

export default function ast2js(node: ASTNode) {

    let left  = node.children[0];
    let right = node.children[1];

    const method = STypes[left.result_type]![VALUES[node.id]] as STypeFctSubs;

    wr( method.substitute_call!(node, left, right) );
}