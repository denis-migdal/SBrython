import { w, wr } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { Int2Number, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";


export default function ast2js(this: ASTNode) {

    const left  = this.children[0];

    if( this.value === 'not')
        return wr( unary_jsop(this, '!', Int2Number(left, 'jsint') ) );

    const method = left.result_type![this.value] as STypeFctSubs;

    wr( method.substitute_call!(this, left) );
}