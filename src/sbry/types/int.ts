import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_INT2INT, RET_STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { TYPE_int, TYPE_type_int_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { write_id_jsop } from "@SBrython/sbry/structs/operators/id";
import { genBinaryOps, write_binary_jsop } from "@SBrython/sbry/structs/operators/binary";
import { CONVERT_2INT, CONVERT_INT2FLOAT, Int2Number } from "@SBrython/sbry/structs/Converters";
import { firstChild, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { genUnaryOps, write_unary_jsop } from "@SBrython/sbry/structs/operators/unary";
import { CMPOPS_LIST } from "@SBrython/sbry/structs/BinaryOperators";
import { genCmpOps } from "@SBrython/sbry/structs/operators/compare";
import { TYPEID_float } from ".";
import { printNode } from "../py2ast";

export default Object.assign(TYPE_int,
    {
        __class__: TYPE_type_int_,
        __str__  : method_wrapper(RET_STR, (_, arg: NODE_ID) => {
            w_node(arg); w_str(".toString()");
        }),
        __int__: method_wrapper(RET_INT, (node, self: NODE_ID) => {
            write_id_jsop(node, self);
        }),
        __abs__: {
            __call__: method_wrapper(RET_INT, (node) => {
                w_sns("_sb_.abs(", firstChild(node), ")");
            })
        },
        __ceil__: {
            __call__: method_wrapper(RET_INT, (node) => {
                write_id_jsop(node, firstChild(node) );
            })
        }
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
            write_call: (node: NODE_ID, self: NODE_ID, op: string, other: NODE_ID) => {
                w_sns("_sb_.floordiv_int(", self, ", ", other, ")");
            },
        }
    ),
    genBinaryOps(['%'], RET_IJ2INT,
        {
            convert_other: CONVERT_2INT,
            write_call: (node: NODE_ID, self: NODE_ID, op: string, other: NODE_ID) => {
                // do not handle -0
                w_sns("_sb_.mod_int(", self, ", ", other, ")");
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