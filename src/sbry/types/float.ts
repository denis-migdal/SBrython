import { RET_FLOAT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { add_method, initBuiltinClass } from "./utils/methods";
import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { CONVERT_INT2FLOAT, Int2Number } from "@SBrython/sbry/structs/Converters";
import { addJSBinOps } from "@SBrython/sbry/structs/operators/binary";
import { addJSUnrOps } from "@SBrython/sbry/structs/operators/unary";
import { addJSCmpOps, JSCmpOps_LIST } from "@SBrython/sbry/structs/operators/compare";
import { firstChild, nextSibling, NODE_ID, resultType, type, VALUES } from "../dop";
import { TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_str, TYPEID_type_float_ } from "./list";
import { OP_BIN_ADD, OP_BIN_DIV, OP_BIN_FDIV, OP_BIN_MOD, OP_BIN_MUL, OP_BIN_POW, OP_BIN_SUB, OP_UNR_MINUS } from "../structs/operators";
import { AST_LIT_STR } from "../ast2js/list";
import TYPES from "./list";
import { Fct } from "./utils/types";

const klass = initBuiltinClass(TYPEID_float, TYPEID_type_float_, "float", "Number");

add_method(klass, "__call__", RET_FLOAT, (node: NODE_ID) => {
    
    const other = nextSibling(firstChild(node));
    const other_type = resultType(other);

    //TODO use their __int__ ?
    if( other_type === TYPEID_int ) {
        w_node(Int2Number(other));
        return;
    }
    if( other_type === TYPEID_float || other_type === TYPEID_jsint) {
        w_node(other);
        return;
    }

    //TODO: power...
    if( other_type === TYPEID_str ) {

        if( type(other) === AST_LIT_STR ) {

            const other_value = VALUES[other].slice(1,-1);

            if( other_value === "inf" || other_value === "infinity" ){
                w_str("Number.POSITIVE_INFINITY");
                return;
            }
            if( other_value === "-inf"|| other_value === "-infinity") {
                w_str("Number.NEGATIVE_INFINITY");
                return;
            }
        }

    
        //if( node.children.length === 3)
        //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;

        //TODO: optimize if other is string litteral...
        w_sns("parseFloat(", other, ")");
        return;
    }

    const otype = TYPES[other_type];
    if( __DEBUG__ && (otype === undefined || otype.__int__ === undefined) )
        throw new Error(`${otype?.__name__}.__int__ not defined`);

    // @ts-ignore
    (otype.__int__ as Fct)![WRITE_CALL]!(node);
});

add_method(klass, "__str__", RET_STR, (call: NODE_ID) => {
    if( __COMPAT_LEVEL__ === "JS") {
        w_node( nextSibling(firstChild(call)) ); w_str(' .toString()');
    } else
        w_sns("_sb_.float2str(", nextSibling(firstChild(call)), ")");
});

add_method(klass, "__abs__", RET_FLOAT, (call: NODE_ID) => {
    w_sns("Math.abs(", nextSibling(firstChild(call)), ")");
});

addJSBinOps(klass, [OP_BIN_POW, OP_BIN_MUL, OP_BIN_DIV, OP_BIN_ADD, OP_BIN_SUB],
            RET_IJBF2FLOAT, { convert_other: CONVERT_INT2FLOAT })

addJSBinOps(klass, [OP_BIN_FDIV], RET_IJBF2FLOAT, {
                convert_other: CONVERT_INT2FLOAT,
                w_call   : (call, a, _op, b) => {
                    return w_sns("_sb_.floordiv_float(", a, ", ", b, ")");
                },
            });

addJSBinOps(klass, [OP_BIN_MOD], RET_IJBF2FLOAT, {
                convert_other: CONVERT_INT2FLOAT,
                w_call   : (call, a, _op, b) => {
                    w_sns("_sb_.mod_float(", a, ", ", b, ")");
                },
            })

addJSUnrOps(klass, [OP_UNR_MINUS], RET_FLOAT);

addJSCmpOps(klass, JSCmpOps_LIST, RET_IJBF2BOOL);