import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_INT2INT, RET_STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { add_method, initBuiltinClass } from "./utils/methods";
import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { w_subs } from "@SBrython/sbry/structs/operators/id";
import { addJSBinOps, w_JSBinOp } from "@SBrython/sbry/structs/operators/binary";
import { CONVERT_2INT, CONVERT_INT2FLOAT, Int2Number, Number2Int } from "@SBrython/sbry/structs/Converters";
import { firstChild, nextSibling, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { addJSUnrOps, w_JSUnrOp } from "@SBrython/sbry/structs/operators/unary";
import TYPES, { TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_str, TYPEID_type_int_ } from "./list";
import { WRITE_CALL } from "./utils/types";
import { OP_BIN_ADD, OP_BIN_DIV, OP_BIN_FDIV, OP_BIN_MOD, OP_BIN_MUL, OP_BIN_POW, OP_BIN_SUB, OP_BIT_AND, OP_BIT_LSHIFT, OP_BIT_NOT, OP_BIT_OR, OP_BIT_RSHIFT, OP_BIT_XOR, OP_UNR_MINUS, OP_UNR_PLUS } from "../structs/operators";
import { addJSCmpOps, JSCmpOps_LIST } from "../structs/operators/compare";

const klass = initBuiltinClass(TYPEID_int, TYPEID_type_int_, "int", "BigInt");

add_method(klass, "__call__", RET_INT, (node: NODE_ID) => {

    const other = nextSibling(firstChild(node));
    const other_type =resultType(other);

    //TODO use their __int__ ?
    if( other_type === TYPEID_int ) {
        w_node(other);
        return;
    }
    if( other_type === TYPEID_jsint) {
        w_node( Number2Int(other) );
        return;
    }
    if( other_type === TYPEID_float ) {
        w_sns("BigInt(Math.trunc(", other, "))");
        return;
    }

    //TODO: power...
    if( other_type === TYPEID_str ) {

        //if( node.children.length === 3)
        //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;

        //TODO: optimize if other is string litteral...
        w_sns("BigInt(", other, ")"); //, ${node.children[2]}))`; 

        return;
    }

    const otype = TYPES[other_type];
    if( __DEBUG__ && (otype === undefined || otype.__int__ === undefined) )
        throw new Error(`${otype?.__name__}.__int__ not defined`);

    otype.__int__![WRITE_CALL](node);
});

add_method(klass, "__str__", RET_STR, (call: NODE_ID) => {
    //TODO: may be litteral...
    w_node( nextSibling(firstChild(call)) ); w_str(".toString()");
});

add_method(klass, "__int__", RET_STR, (call: NODE_ID) => {
    w_subs(call, nextSibling(firstChild(call)) );
});

add_method(klass, "__abs__", RET_INT, (call: NODE_ID) => {
    w_sns("_sb_.abs(", nextSibling(firstChild(call)), ")");
});

add_method(klass, "__ceil__", RET_INT, (call: NODE_ID) => {
    w_subs(call, nextSibling(firstChild(call)) );
});

addJSBinOps(klass, [OP_BIN_POW, OP_BIN_ADD, OP_BIN_SUB,    OP_BIT_AND,
                    OP_BIT_OR,  OP_BIT_XOR, OP_BIT_LSHIFT, OP_BIT_RSHIFT],
            RET_IJ2INT, { convert_other: CONVERT_2INT});

addJSBinOps(klass, [OP_BIN_MUL], // *
            RET_INT2INT, {
                w_call: (call) => {
    
                    let a = nextSibling(firstChild(call)); let b = nextSibling(a);

                    if( resultType(call) === TYPEID_float ) {
                        a = Int2Number(a);
                        b = Int2Number(b);
                    }
                    
                    w_JSBinOp(call, a, OP_BIN_MUL, b);
                },
            });

addJSBinOps(klass, [OP_BIN_DIV], // /
            RET_IJBF2FLOAT, {
                convert_self : CONVERT_INT2FLOAT,
                convert_other: CONVERT_INT2FLOAT
            });

addJSBinOps(klass, [OP_BIN_FDIV], // //
                    RET_IJ2INT, {
                        convert_other  : CONVERT_2INT,
                        w_call: (call: NODE_ID) => {

                            const a = nextSibling(firstChild(call)); const b = nextSibling(a);

                            w_sns("_sb_.floordiv_int(", a, ", ", b, ")");
                        },
                    });

addJSBinOps(klass, [OP_BIN_MOD], // %
                    RET_IJ2INT, {
                        convert_other  : CONVERT_2INT,
                        w_call: (call: NODE_ID) => {

                            const a = nextSibling(firstChild(call)); const b = nextSibling(a);

                            // do not handle -0
                            w_sns("_sb_.mod_int(", a, ", ", b, ")");
                        },
                    });

addJSUnrOps(klass, [OP_UNR_MINUS], RET_INT, (call, op, a) => {

    if( resultType(call) === TYPEID_float ) // conversion asked.
        a = Int2Number(a);
    
    w_JSUnrOp(call, OP_UNR_MINUS, a);
});

addJSUnrOps(klass, [OP_BIT_NOT], RET_INT); //~

addJSCmpOps(klass, JSCmpOps_LIST, RET_IJBF2BOOL);