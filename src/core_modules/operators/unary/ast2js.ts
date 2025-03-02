import { wr } from "ast2js";
import { firstChild, resultType, VALUES } from "dop";
import { Int2Number, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { STYPE_JSINT, STypes } from "structs/STypes";


export default function ast2js(node: number) {

    const left  = firstChild(node);
    const value = VALUES[node];

    if( value === 'not')
        return wr( unary_jsop(node, '!', Int2Number(left, STYPE_JSINT) ) );

    const method = STypes[resultType(left)!][value] as STypeFctSubs;

    wr( method.substitute_call!(node, left) );
}