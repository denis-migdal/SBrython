import { firstChild, nextSibling, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { AssignOperators } from "@SBrython/sbry/structs/BinaryOperators";
import { TYPEID_NotImplementedType } from "@SBrython/sbry/types";
import Types from "@SBrython/sbry/types/list";
import { Fct, RETURN_TYPE, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

export default function ast2js(node: NODE_ID) {

    let op = AssignOperators[VALUES[node] as keyof typeof AssignOperators];

    const coffset = firstChild(node);

    let type = TYPEID_NotImplementedType;
    let method = Types[resultType(coffset)][op] as Fct;

    const c2 = nextSibling(coffset);

    if( method !== undefined )
        type = method[RETURN_TYPE](resultType(c2)!);

    // try a = a + b
    if( __DEBUG__ && type === TYPEID_NotImplementedType) {
        throw new Error(`${Types[resultType(coffset)].__name__} ${op} ${Types[resultType(c2)].__name__} NOT IMPLEMENTED!`);
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

    method[WRITE_CALL](node, coffset, c2);
}