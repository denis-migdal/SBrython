import { parentOPPrio, setParentOPPrio, type, VALUES } from "@SBrython/dop";
import { jsop2pyop, JSOperatorsPrio } from "../BinaryOperators";
import { Converter, NOCONVERT } from "../Converters";
import { RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { method_wrapper } from "@SBrython/types/utils/methods";
import { w_sns } from "@SBrython/ast2js";
import { write_unary_jsop } from "./unary";
import { AST2JS } from "@SBrython/core_modules/lists";

export type GenBinaryOps_Opts = {
    convert_other   ?: Converter,
    convert_self    ?: Converter,
    write_call      ?: (node: number, self: number, op: string, other: number) => void
};

export function genBinaryOps(ops: (keyof typeof jsop2pyop)[],
                            return_type: RETURN_TYPE_FCT, 
                         {
                            convert_other   = NOCONVERT,
                            convert_self    = NOCONVERT,
                            write_call      = write_binary_jsop,
                         }: GenBinaryOps_Opts = {}) {

    let result: Record<string, ReturnType<typeof method_wrapper>> = {};

    for(let op of ops) {

        const pyop = jsop2pyop[op]; //TODO: op...
        if( op === '//')
            op = '/';

        result[`__${pyop}__`]  = method_wrapper(return_type,
            (node: number, self: number, other: number) => {
            return write_call(node, convert_self(self), op, convert_other(other) );
        });

        result[`__r${pyop}__`] = method_wrapper(return_type,
            (node: number, self: number, other: number) => {
            return write_call(node, convert_other(other), op, convert_self(self) );
        });

        if( convert_self === NOCONVERT && write_call === write_binary_jsop) {

            result[`__i${pyop}__`] = method_wrapper(return_type,
        
                (node: number, self: number, other: number) => {
                    
                    const other_value = VALUES[other];

                    if( op === '+' && other_value === 1)
                        return write_unary_jsop(node, '++', self);
                    if( op === '-' && other_value === 1)
                        return write_unary_jsop(node, '--', self);
                    
                    return write_binary_jsop(node, self, op+'=', convert_other(other) );
                },
            );
        }
    }
    
    return result;
}

export function write_binary_jsop(node: number, a: number, op: string, b: number) {

    const   prio = JSOperatorsPrio[op];
    const p_prio = parentOPPrio(node);

    setParentOPPrio(a, prio);
    setParentOPPrio(b, prio);

    let l = ""; let r = "";

    if( p_prio > prio ) {
        l = "("; r = ")";
    }

    w_sns(l, a, op, b, r);
}