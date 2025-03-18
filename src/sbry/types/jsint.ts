import { genBinaryOps, write_binary_jsop } from "@SBrython/sbry/structs/operators/binary";
import { TYPE_jsint, TYPE_type_int_ } from "./bases";
import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_JSINT, RET_JSINT2JSINT } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { CONVERT_2INT, CONVERT_INT2FLOAT, Int2Number, Number2Int } from "@SBrython/sbry/structs/Converters";
import { firstChild, resultType } from "@SBrython/sbry/dop";
import { CMPOPS_LIST } from "@SBrython/sbry/structs/BinaryOperators";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { genUnaryOps, write_unary_jsop } from "@SBrython/sbry/structs/operators/unary";
import { genCmpOps } from "@SBrython/sbry/structs/operators/compare";
import { TYPEID_int } from ".";
import { method_wrapper } from "./utils/methods";
import { write_id_jsop } from "../structs/operators/id";

export default Object.assign(TYPE_jsint,
    {
        __class__: TYPE_type_int_,
        __abs__: {
            __call__: method_wrapper(RET_JSINT, (node) => {
                w_sns("Math.abs(", firstChild(node), ")");
            })
        },
        __ceil__: {
            __call__: method_wrapper(RET_INT, (node) => {
                write_id_jsop(node, firstChild(node) );
            })
        }
    },
    genBinaryOps(
        // '**' and '*' => if "as float" could accept loss of precision.
        [
            '**', '+', '-',
            '&', '|', '^', '>>', '<<' // in JS bit operations are on 32bits
        ],
        RET_IJ2INT,
        {
            convert_self : CONVERT_2INT,
            convert_other: CONVERT_2INT
        }
    ),
    genBinaryOps(['*'], RET_IJ2INT,
        {
            write_call: (node, a, op, b) => {
                if( resultType(node) === TYPEID_int ){
                    a = Number2Int(a);
                    b = Number2Int(b);
                } else {
                    a = Int2Number(a);
                    b = Int2Number(b);
                }
                
                write_binary_jsop(node, a, '*', b);
            },
        }
    ),
    genBinaryOps(['/'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT
        }
    ),
    genBinaryOps(['//'], RET_JSINT2JSINT,
        {
            write_call: (node: number, self: number, op, other: number) => {
                w_sns("_sb_.floordiv_float(", self, ", ", other, ")");
            },
        }
    ),
    genBinaryOps(['%'], RET_JSINT2JSINT,
        {
            write_call: (node: number, self: number, op, other: number) => {
                // do not handle -0
                w_sns("_sb_.mod_int(", self, ", ", other, ")");
            },
        }
    ),
    genUnaryOps(['u.-'], RET_JSINT, // min_safe_integer == max_safe_integer.
        {
            write_call: (node, op, a) => {

                if( resultType(node) === TYPEID_int )
                    a = Number2Int(a);
                
                return write_unary_jsop(node, '-', a);
            },
        }
    ),
    genUnaryOps(['~'], RET_INT, // min_safe_integer == max_safe_integer.
        {
            write_call: (node, op, a) =>{
                write_unary_jsop(node, '~', Number2Int(a) );
            }
        }
    ),
    genCmpOps(  CMPOPS_LIST, RET_IJBF2BOOL)
);