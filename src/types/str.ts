import { RET_IJ2STR, RET_INT, RET_STR2BOOL, RET_STR2STR } from "@SBrython/structs/ReturnTypeFcts";
import { TYPE_str, TYPE_type_str_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { firstChild, resultType } from "@SBrython/dop";
import { w_node, w_sns, w_str } from "@SBrython/ast2js";
import { CMPOPS_LIST } from "@SBrython/structs/BinaryOperators";
import { CONVERT_INT2FLOAT } from "@SBrython/structs/Converters";
import { genCmpOps } from "@SBrython/structs/operators/compare";
import { genBinaryOps } from "@SBrython/structs/operators/binary";
import { TYPEID_str } from ".";

export default Object.assign(TYPE_str,
    {
        __name__ : "str",
        __class__: TYPE_type_str_,
        __len__: method_wrapper(RET_INT, (node) => {
            w_node( firstChild(node) + 1 );
            w_str(".length");
        })
    },
    genCmpOps   (CMPOPS_LIST, RET_STR2BOOL),
    genBinaryOps(["+"]      , RET_STR2STR),
    genBinaryOps(["*"]      , RET_IJ2STR,
        {
            convert_other  : CONVERT_INT2FLOAT,
            write_call: (node: number, a: number, op, b: number) => {
                
                if( resultType(a) !== TYPEID_str ){
                    const t = a;
                    a = b; b = t;
                }

                w_sns("", a, ".repeat(", b, ")");
            }
        }),
);