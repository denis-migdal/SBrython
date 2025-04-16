import { add_method } from "@SBrython/sbry/types/utils/methods";
import { RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { firstChild, nextSibling, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { w_JSBinOp } from "./binary";
import { OP_CMP_EQ, OP_CMP_GE, OP_CMP_GT, OP_CMP_LE, OP_CMP_LT, OP_CMP_NEQ, OP_EQ2IS, OP_ID, opid2opmethod } from ".";

export const JSCmpOps_LIST = [OP_CMP_EQ, OP_CMP_NEQ, OP_CMP_LT, OP_CMP_LE, OP_CMP_GT, OP_CMP_GE] as const;;

export function addJSCmpOps(target     : any,
                            ops        : readonly OP_ID[],
                            return_type: RETURN_TYPE_FCT) {

    for(let i = 0; i < ops.length; ++i) {

        const op = ops[i];

        add_method(target, opid2opmethod[op], return_type, (call: NODE_ID) => {
            const a = nextSibling(firstChild(call));
            const b = nextSibling(a);
            w_JSCmpOp(call, a, op, b );
        });
    }
}


export function w_JSCmpOp(node: NODE_ID, a: NODE_ID, op: OP_ID, b: NODE_ID) {

    /*if( reversed ) { // reverse OP: meh
        [a,b] = [b,a];
        cop = reverse[cop as keyof typeof reverse];
    }*/

    if( (op === OP_CMP_EQ || op === OP_CMP_NEQ) && resultType(a) === resultType(b) )
        op += OP_EQ2IS; // use is/is not JS op.

    w_JSBinOp(node, a, op, b);
}