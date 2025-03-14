import { firstChild, resultType, VALUES } from "@SBrython/dop";
import { AssignOperators } from "@SBrython/structs/BinaryOperators";
import { TYPEID_NotImplementedType } from "@SBrython/types";
import Types from "@SBrython/types/list";
import { Fct, RETURN_TYPE, WRITE_CALL } from "@SBrython/types/utils/types";

export default function ast2js(node: number) {

    let op = AssignOperators[VALUES[node] as keyof typeof AssignOperators];

    const coffset = firstChild(node);

    let type = TYPEID_NotImplementedType;
    let method = Types[resultType(coffset)][op] as Fct;

    if( method !== undefined )
        type = method[RETURN_TYPE](resultType(coffset+1)!);

    // try a = a + b
    if( __DEBUG__ && type === TYPEID_NotImplementedType) {
        throw new Error(`${Types[resultType(coffset)].__name__} ${op} ${Types[resultType(coffset+1)].__name__} NOT IMPLEMENTED!`);
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

    method[WRITE_CALL](node, coffset, coffset+1);
}