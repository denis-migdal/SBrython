import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_INT2INT, RET_STR } from "@SBrython/structs/ReturnTypeFcts";
import { TYPE_int, TYPE_type_int_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { w_node, w_sns, w_str } from "@SBrython/ast2js";
import { write_id_jsop } from "@SBrython/structs/operators/id";
import { genBinaryOps, write_binary_jsop } from "@SBrython/structs/operators/binary";
import { CONVERT_2INT, CONVERT_INT2FLOAT, Int2Number } from "@SBrython/structs/Converters";
import { resultType } from "@SBrython/dop";
import { genUnaryOps, write_unary_jsop } from "@SBrython/structs/operators/unary";
import { CMPOPS_LIST } from "@SBrython/structs/BinaryOperators";
import { genCmpOps } from "@SBrython/structs/operators/compare";
import { TYPEID_float } from ".";

export default Object.assign(TYPE_int,
    {
        __name__ : "int",
        __class__: TYPE_type_int_,
        __str__  : method_wrapper(RET_STR, (_, arg) => {
            w_node(arg); w_str(".toString()");
        }),
        __int__: method_wrapper(RET_INT, (node, self) => {
            return write_id_jsop(node, self);
        })
    },
    genBinaryOps([
            // '**' => if "as float" could accept loss of precision.
            '**', '+', '-',
            '&', '|', '^', '>>', '<<'
        ],
        RET_IJ2INT,
        {
            convert_other: CONVERT_2INT
        }
    ),
    genBinaryOps(['*'], RET_INT2INT,
        {
            write_call: (node, a, _, b) => {

                if( resultType(node) === TYPEID_float ) {
                    a = Int2Number(a);
                    b = Int2Number(b);
                }
                
                write_binary_jsop(node, a, '*', b);
            },
        }
    ),
    genBinaryOps(['/'], RET_IJBF2FLOAT,
        {
            convert_self : CONVERT_INT2FLOAT,
            convert_other: CONVERT_INT2FLOAT
        }
    ),
    genBinaryOps(['//'], RET_IJ2INT,
        {
            convert_other  : CONVERT_2INT,
            write_call: (node: number, self: number, op: string, other: number) => {
                w_sns("_b_.floordiv_int(", self, ", ", other, ")");
            },
        }
    ),
    genBinaryOps(['%'], RET_IJ2INT,
        {
            convert_other: CONVERT_2INT,
            write_call: (node: number, self: number, op: string, other: number) => {
                // do not handle -0
                w_sns("_b_.mod_int(", self, ", ", other, ")");
            },
        }
    ),
    genUnaryOps(['u.-'], RET_INT,
        {
            write_call: (node, op, a) => {

                if( resultType(node) === TYPEID_float )
                    a = Int2Number(a);
                
                write_unary_jsop(node, '-', a);
            },
        }
    ),
    genUnaryOps( ['~'], RET_INT),
    genCmpOps(  CMPOPS_LIST, RET_IJBF2BOOL)
    /* */
);