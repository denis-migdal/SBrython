import { RET_FLOAT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { method_wrapper } from "./utils/methods";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { TYPE_float, TYPE_type_float_ } from "./bases";
import { CONVERT_INT2FLOAT } from "@SBrython/sbry/structs/Converters";
import { genBinaryOps } from "@SBrython/sbry/structs/operators/binary";
import { CMPOPS_LIST } from "@SBrython/sbry/structs/BinaryOperators";
import { genUnaryOps } from "@SBrython/sbry/structs/operators/unary";
import { genCmpOps } from "@SBrython/sbry/structs/operators/compare";
import { firstChild, nextSibling, NODE_ID } from "../dop";

export default Object.assign(TYPE_float,
    {
        __class__: TYPE_type_float_,

        __str__: method_wrapper(RET_STR, (node, arg: NODE_ID) => {
            w_sns("_sb_.float2str(", arg, ")");
        }),
        __abs__: {
            __call__: method_wrapper(RET_FLOAT, (node) => {
                w_sns("Math.abs(", nextSibling(firstChild(node)), ")");
            })
        },
    },
    genBinaryOps(['**', '*', '/', '+', '-'], RET_IJBF2FLOAT,
                    {
                        convert_other: CONVERT_INT2FLOAT
                    }
    ),
    genBinaryOps(['//'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT,
            write_call   : (_node, a, _op, b) => {
                return w_sns("_sb_.floordiv_float(", a, ", ", b, ")");
            },
        }
    ),
    genBinaryOps(['%'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT,
            write_call   : (_node, a, _op, b) => {
                w_sns("_sb_.mod_float(", a, ", ", b, ")");
            },
        }
    ),
    genUnaryOps(['u.-']    , RET_FLOAT),
    genCmpOps  (CMPOPS_LIST, RET_IJBF2BOOL),
);