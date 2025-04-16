import { firstChild, nextSibling, NODE_ID, parentOPPrio, setParentOPPrio } from "@SBrython/sbry/dop";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { add_method } from "@SBrython/sbry/types/utils/methods";
import {  OP_ID, opid2jsop, opid2opmethod } from ".";

export function addJSUnrOps(target     : any,
                            ops        : OP_ID[],
                            return_type: RETURN_TYPE_FCT,
                            w_call = w_JSUnrOp
                        ) {

    for(let i = 0; i < ops.length; ++i) {

        const op = ops[i];

        add_method(target, opid2opmethod[op], return_type, (node: NODE_ID) => {
            w_call(node, op, nextSibling(firstChild(node)));
        })
    }
}

export function w_JSUnrOp(node: NODE_ID, op: OP_ID, a: NODE_ID) {

    const prio   = 14; //jsop_priorities[op];
    const p_prio = parentOPPrio(node);

    setParentOPPrio(a, prio);

    let l = opid2jsop[op]; let r = "";

    if( p_prio > prio ) {
        l = `(${l}`; r = ")";
    }

    w_sns(l, a, r);
}