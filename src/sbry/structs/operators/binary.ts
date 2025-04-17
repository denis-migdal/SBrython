import { firstChild, nextSibling, NODE_ID, parentOPPrio, setParentOPPrio, VALUES } from "@SBrython/sbry/dop";
import { Converter, NOCONVERT } from "../Converters";
import { RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { add_method } from "@SBrython/sbry/types/utils/methods";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { jsop_priorities, OP_BIN_ADD, OP_BIN_SUB, opid2iopmethod, opid2jsop, opid2opmethod, opid2ropmethod, type OP_ID } from ".";
import { w_JSUnrOp } from "./unary";

export type addJSBinOps_Opts = {
    convert_other?: Converter,
    convert_self ?: Converter,
    w_call       ?: (call: NODE_ID, a: NODE_ID, op: OP_ID, b: NODE_ID) => void
};

export function addJSBinOps(target     : any,
                            ops        : OP_ID[],
                            return_type: RETURN_TYPE_FCT, 
                            {
                                convert_other = NOCONVERT,
                                convert_self  = NOCONVERT,
                                w_call        = w_JSBinOp,
                            }: addJSBinOps_Opts = {}) {

    const ADD_EQ = convert_self === NOCONVERT && w_call === w_JSBinOp;

    for(let i = 0; i < ops.length; ++i) {

        const op = ops[i];

        add_method(target, opid2opmethod[op], return_type, (call: NODE_ID) => {
            const _ = firstChild(call);
            const a = nextSibling(_); const b = nextSibling(a);
            return w_call(call, convert_self(a), op, convert_other(b) );
        });
        add_method(target, opid2ropmethod[op], return_type, (call: NODE_ID) => {
            const _ = firstChild(call);
            const a = nextSibling(_); const b = nextSibling(a);
            return w_call(call, convert_other(b), op, convert_self(a) );
        });

        if( ADD_EQ ) {

            const iop = op+29;

            const ADD_INCR = op === OP_BIN_ADD;
            const ADD_DECR = op === OP_BIN_SUB;

            //TODO:
            add_method(target, opid2iopmethod[op], return_type, (call: NODE_ID) => {

                const a = nextSibling(firstChild(call));
                const b = nextSibling(a);

                /*
                const other_value = VALUES[b]; //TODO...

                if( ADD_INCR && other_value === "1")
                    return w_JSUnrOp(node, 0, a); //TODO... ++
                if( ADD_DECR && other_value === "1")
                    return w_JSUnrOp(node, 0, a); //TODO... --*/

                //TODO...

                return w_JSBinOp(call, a, iop, convert_other(b) );
            });
        }
    }
}

// a & b not necessary children of node...
export function w_JSBinOp(node: NODE_ID, a: NODE_ID, op: OP_ID, b: NODE_ID) {

    const   prio = jsop_priorities[op];
    const p_prio = parentOPPrio(node);

    setParentOPPrio(a, prio);
    setParentOPPrio(b, prio);

    let l = ""; let r = "";

    if( p_prio > prio ) {
        l = "("; r = ")";
    }

    w_sns(l, a, opid2jsop[op], b, r);
}