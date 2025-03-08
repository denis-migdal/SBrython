import { wr } from "@SBrython/ast2js";
import { firstChild, resultType, VALUES } from "@SBrython/dop";
import { AssignOperators } from "@SBrython/structs/BinaryOperators";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { STYPE_NOT_IMPLEMENTED, STypes } from "@SBrython/structs/STypes";

export default function ast2js(node: number) {

    let op = AssignOperators[VALUES[node] as keyof typeof AssignOperators];

    const coffset = firstChild(node);

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[resultType(coffset)]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type(resultType(coffset+1)!);

    // try a = a + b
    if( type === STYPE_NOT_IMPLEMENTED) {
        throw new Error(`${resultType(coffset+1)} ${op}= ${resultType(coffset)} NOT IMPLEMENTED!`);
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

    wr( method.substitute_call!(node, coffset, coffset+1) );
}