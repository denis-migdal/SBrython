import { w_sns } from "../ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "../dop";
import { add_method, initBuiltinClass } from "./utils/methods";

import { TYPEID_type } from "./list";

const klass = initBuiltinClass(TYPEID_type, TYPEID_type, "type", "");

add_method(klass, "__call__", () => TYPEID_type, (call: NODE_ID) => {
                w_sns("(", nextSibling(firstChild(call)), ").constructor");
            });