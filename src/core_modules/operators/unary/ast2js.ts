import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Int2Number, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";


export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    //let right = this.children[1];

    if( this.value === 'not')
        return toJS( unary_jsop(this, '!', Int2Number(left, 'jsint') ), cursor );

    const method = left.result_type![this.value] as STypeFctSubs;

    return toJS( method.substitute_call!(this, left/*, right*/), cursor);
}