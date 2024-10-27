import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { AssignOperators, reversed_operator } from "structs/BinaryOperators";
import { SType_NOT_IMPLEMENTED } from "structs/SType";
import { name2SType } from "structs/STypes";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    let right = this.children[1];

    let op = AssignOperators[this.value];

    let type = SType_NOT_IMPLEMENTED;
    let method = name2SType(left.result_type as STypeName)?.[op];

    console.warn(op, this.value, left.result_type, method, name2SType(left.result_type as STypeName));

    if( method !== undefined )
        type = method.return_type(right.result_type!);

    // try a = a + b
    if( type === SType_NOT_IMPLEMENTED) {
        throw new Error(`${right.result_type} ${op}= ${left.result_type} NOT IMPLEMENTED!`);
        /*
        op     = reversed_operator(op);
        method = name2SType(right.result_type as STypeName)?.[op];
        if( method !== undefined)
            type   = method.return_type(left.result_type);

        if( type === SType_NOT_IMPLEMENTED)
            throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);

        [left, right] = [right, left];
        */
    }

    return toJS( method.call_substitute(this, left, right), cursor);
}