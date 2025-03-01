import { wr } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { Int2Number, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { STYPE_JSINT, STypes } from "structs/STypes";


export default function ast2js(node: ASTNode) {

    const left  = node.children[0];
    const value = VALUES[node.id];

    if( value === 'not')
        return wr( unary_jsop(node, '!', Int2Number(left, STYPE_JSINT) ) );

    const method = STypes[left.result_type!][value] as STypeFctSubs;

    wr( method.substitute_call!(node, left) );
}