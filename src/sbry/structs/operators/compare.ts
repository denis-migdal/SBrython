import { method_wrapper } from "@SBrython/sbry/types/utils/methods";
import { jsop2pyop } from "../BinaryOperators";
import { Converter, NOCONVERT } from "../Converters";
import { AST_KEY_RETURN_TYPE_FCT } from "../ReturnTypeFcts";
import { resultType } from "@SBrython/sbry/dop";
import { write_binary_jsop } from "./binary";

//TODO....
const reverse = {
    "==": "==",
    "!=": "!=",
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">=",
} as const;

//TODO: handle reversed : remove condition ??? -> switch children ???

export function write_compare_jsop(node: number, a: number, op: string, b: number, reversed: boolean) {

    let cop = op;

    if( reversed ) {
        [a,b] = [b,a];
        cop = reverse[cop as keyof typeof reverse];
    }

    if(    (cop[0] === '=' || cop[0] === '!')
        && resultType(a) === resultType(b) )
            cop += '=';

    write_binary_jsop(node, a, cop, b);
}

export type GenCmpOps_Opts = {
    convert_other   ?: Converter,
    convert_self    ?: Converter,
    write_call      ?: (node: number, self: number, op: string, other: number, reversed: boolean) => void
};

export function genCmpOps(  ops        : readonly (keyof typeof reverse)[],
                            return_type: AST_KEY_RETURN_TYPE_FCT,
                            {
                                convert_other   = NOCONVERT,
                                convert_self    = NOCONVERT,
                                write_call      = write_compare_jsop,
                             }: GenCmpOps_Opts = {} ) {

    let result: Record<string, ReturnType<typeof method_wrapper>> = {};

    for(const op of ops) {

        const pyop = jsop2pyop[op];

        result[`__${pyop}__`] = method_wrapper(return_type, (node: number, self: number, o: number, reversed: boolean) => {
            write_call(node, convert_self(self), op, convert_other(o), reversed );
        });
    }
    
    return result;
}