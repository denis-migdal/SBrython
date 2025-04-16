import { addJSBinOps, w_JSBinOp } from "@SBrython/sbry/structs/operators/binary";
import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_JSINT, RET_JSINT2JSINT } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { CONVERT_2INT, CONVERT_INT2FLOAT, Int2Number, Number2Int } from "@SBrython/sbry/structs/Converters";
import { firstChild, nextSibling, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { addJSUnrOps, w_JSUnrOp } from "@SBrython/sbry/structs/operators/unary";
import { addJSCmpOps, JSCmpOps_LIST } from "@SBrython/sbry/structs/operators/compare";
import { TYPEID_jsint, TYPEID_int, TYPEID_type_jsint_ } from "./list";
import { add_method, initBuiltinClass } from "./utils/methods";
import { w_subs } from "../structs/operators/id";
import { OP_BIN_ADD, OP_BIN_DIV, OP_BIN_FDIV, OP_BIN_MOD, OP_BIN_MUL, OP_BIN_POW, OP_BIN_SUB, OP_BIT_AND, OP_BIT_LSHIFT, OP_BIT_NOT, OP_BIT_OR, OP_BIT_RSHIFT, OP_BIT_XOR, OP_UNR_MINUS } from "../structs/operators";

const klass = initBuiltinClass(TYPEID_jsint, TYPEID_type_jsint_, "int", "BigInt");

add_method(klass, "__abs__", RET_JSINT, (call: NODE_ID) => {
    w_sns("Math.abs(", nextSibling(firstChild(call)), ")");
});

add_method(klass, "__ceil__", RET_JSINT, (call: NODE_ID) => {
    w_subs(call, nextSibling(firstChild(call)));
});

// '**' and '*' => if "as float" could accept loss of precision.
addJSBinOps(klass,
            [OP_BIN_POW, OP_BIN_ADD, OP_BIN_SUB, OP_BIT_AND,
             OP_BIT_OR , OP_BIT_XOR, OP_BIT_LSHIFT, OP_BIT_RSHIFT],
            RET_IJ2INT,
            {
                // in JS bit operations are on 32bits
                convert_self : CONVERT_2INT,
                convert_other: CONVERT_2INT
            });

addJSBinOps(klass, [OP_BIN_MUL], RET_IJ2INT, {
            w_call: (node, a, op, b) => {
                    if( resultType(node) === TYPEID_int ){
                        a = Number2Int(a);
                        b = Number2Int(b);
                    } else {
                        a = Int2Number(a);
                        b = Int2Number(b);
                    }
                    
                    w_JSBinOp(node, a, OP_BIN_MUL, b);
                },
            });

addJSBinOps(klass, [OP_BIN_DIV], RET_IJBF2FLOAT, {convert_other: CONVERT_INT2FLOAT});

addJSBinOps(klass, [OP_BIN_FDIV], RET_JSINT2JSINT, {
            w_call: (call: NODE_ID, a: NODE_ID, op, b: NODE_ID) => {
                w_sns("_sb_.floordiv_float(", a, ", ", b, ")");
            },
        });

addJSBinOps(klass, [OP_BIN_MOD], RET_JSINT2JSINT, {
            w_call: (call: NODE_ID, a: NODE_ID, op, b: NODE_ID) => {
                // do not handle -0
                w_sns("_sb_.mod_int(", a, ", ", b, ")");
            },
        })

addJSUnrOps(klass, [OP_UNR_MINUS], RET_JSINT, (call, op, a) => {

                if( resultType(call) === TYPEID_int )
                    a = Number2Int(a);
                
                return w_JSUnrOp(call, OP_UNR_MINUS, a);
        }); // min_safe_integer == max_safe_integer.

addJSUnrOps(klass, [OP_BIT_NOT], RET_INT, (node, op, a) =>{
                w_JSUnrOp(node, OP_BIT_NOT, Number2Int(a) );
            })

addJSCmpOps(klass, JSCmpOps_LIST, RET_IJBF2BOOL);