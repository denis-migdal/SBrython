import { wr } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { AssignOperators } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";

export default function ast2js(node: ASTNode) {

    let left  = node.children[0];
    let right = node.children[1];

    let op = AssignOperators[VALUES[node.id] as keyof typeof AssignOperators];

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[left.result_type]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type(right.result_type!);

    // try a = a + b
    if( type === STYPE_NOT_IMPLEMENTED) {
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

    wr( method.substitute_call!(node, left, right) );
}