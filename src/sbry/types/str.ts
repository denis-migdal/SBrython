import { RET_IJ2STR, RET_INT, RET_STR, RET_STR2BOOL, RET_STR2STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { add_method, initBuiltinClass } from "./utils/methods";
import { firstChild, nextSibling, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { CONVERT_INT2FLOAT } from "@SBrython/sbry/structs/Converters";
import { addJSCmpOps, JSCmpOps_LIST } from "@SBrython/sbry/structs/operators/compare";
import { addJSBinOps } from "@SBrython/sbry/structs/operators/binary";
import { TYPEID_str, TYPEID_type_str_ } from "./list";
import { OP_BIN_ADD, OP_BIN_MUL } from "../structs/operators";
import TYPES from "./list";
import { printNode } from "../py2ast";
import { WRITE_CALL } from "./utils/types";

const klass = initBuiltinClass(TYPEID_str, TYPEID_type_str_, "str", "String");

add_method(klass, "__call__", RET_STR, (node) => {

    const other = nextSibling(firstChild(node));
    const other_type = resultType(other);

    //TODO use their __int__ ?
    if( other_type === TYPEID_str ) {
        w_node(other);
        return;
    }

    const otype = TYPES[other_type].__class__;
    if( __DEBUG__ && (otype === undefined || otype.__str__ === undefined) ) {
        printNode(other);
        throw new Error(`${otype?.__name__}.__str__ not defined`);
    }

    // @ts-ignore
    otype.__str__!.__call__![WRITE_CALL](node);
});

add_method(klass, "__len__", RET_INT, (call: NODE_ID) => {
    w_node( nextSibling(firstChild(call)) ); w_str(".length");
});

addJSCmpOps(klass, JSCmpOps_LIST, RET_STR2BOOL);

addJSBinOps(klass, [OP_BIN_ADD], RET_STR2STR);

addJSBinOps(klass, [OP_BIN_MUL], RET_IJ2STR, {
                convert_other  : CONVERT_INT2FLOAT,
                w_call: (call: NODE_ID, a: NODE_ID, op, b: NODE_ID) => {
                    
                    if( resultType(a) !== TYPEID_str ){
                        const _ = a;
                        a = b; b = _;
                    }

                    w_sns("", a, ".repeat(", b, ")");
                }
            });