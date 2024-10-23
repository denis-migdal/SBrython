import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Int2Float, unary_jsop } from "structs/BinaryOperators";
import { name2SType } from "structs/STypes";


export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    //let right = this.children[1];

    if( this.value === 'not')
        return toJS( unary_jsop(this, '!', Int2Float(left, true) ), cursor );

    const method = name2SType(left.result_type)[this.value];

    return toJS( method.call_substitute(this, left/*, right*/), cursor);
}