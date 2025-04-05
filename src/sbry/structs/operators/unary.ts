import { NODE_ID, parentOPPrio, setParentOPPrio } from "@SBrython/sbry/dop";
import { jsop2pyop, JSOperatorsPrio } from "../BinaryOperators";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { method_wrapper } from "@SBrython/sbry/types/utils/methods";


type GenUnaryOps_Opts = {
    //convert_self ?: Converter,
    write_call   ?: (node: NODE_ID, op: string, a: NODE_ID) => void
};

export function genUnaryOps(ops        : (keyof typeof jsop2pyop)[],
                            return_type: RETURN_TYPE_FCT,
                            {
                                //convert_self = NOCONVERT,
                                write_call   = write_unary_jsop,
                            }: GenUnaryOps_Opts = {}
                        ) {

    let result: Record<string, ReturnType<typeof method_wrapper>> = {};

    for(let op of ops) {

        const pyop = jsop2pyop[op];
        if( op === 'u.-')
            op = '-';

        result[`__${pyop}__`] = method_wrapper(return_type,
            (node: NODE_ID, self: NODE_ID) => {
                return write_call(node, op, self); //convert_self(self) );
            }
        )
    }
    
    return result;
}

export function write_unary_jsop(node: NODE_ID, op: string, a: NODE_ID) {

    let rop = op;
    if( rop === '-')
        rop = 'u.-';

    // unary JS Op prio list (?)
    const prio   = JSOperatorsPrio[rop];
    const p_prio = parentOPPrio(node);

    setParentOPPrio(a, prio);

    let l = op; let r = "";

    if( p_prio > prio ) {
        l = `(${op}`; r = ")";
    }

    w_sns(l, a, r);
}