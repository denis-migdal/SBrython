import { wr } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { AssignOperators } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { SType_NotImplementedType } from "structs/STypes";

export default function ast2js(this: ASTNode) {

    let left  = this.children[0];
    let right = this.children[1];

    let op = (AssignOperators as any)[this.value];

    let type = SType_NotImplementedType;
    let method = left.result_type?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type(right.result_type!);

    // try a = a + b
    if( type === SType_NotImplementedType) {
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

    wr( method.substitute_call!(this, left, right) );
}