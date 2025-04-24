import { w_sns } from "../ast2js/utils";
import { firstChild, nextSibling, NODE_ID, TYPE_ID } from "../dop";
import { add_method, initBuiltinClass } from "./utils/methods";

import { TYPEID_bool, TYPEID_NotImplemented, TYPEID_type } from "./list";
import { addJSCmpOps } from "../structs/operators/compare";
import { OP_CMP_EQ, OP_CMP_NEQ } from "../structs/operators";

const klass = initBuiltinClass(TYPEID_type, TYPEID_type, "type", "");

add_method(klass, "__call__", () => TYPEID_type, (call: NODE_ID) => {
                w_sns("(", nextSibling(firstChild(call)), ").constructor");
            });


addJSCmpOps(klass, [OP_CMP_EQ, OP_CMP_NEQ], (type: number) => {
    if(type === TYPEID_type)
        return TYPEID_bool;
    return TYPEID_NotImplemented;
});