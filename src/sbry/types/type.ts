import { TYPEID_type } from "./index";
import { w_sns } from "../ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "../dop";
import { TYPE_type } from "./bases";
import { method_wrapper } from "./utils/methods";

export default Object.assign(TYPE_type,
    {
        __class__: TYPE_type,
        __name__ : "type",
        __call__ : method_wrapper( () => TYPEID_type, (call: NODE_ID) => {
            const coffset = nextSibling(firstChild(call));
            w_sns("(", coffset, ").constructor");
        })
    });