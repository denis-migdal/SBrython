import { TYPE_type, TYPE_type_bool_ } from "./bases";
import { JS_NAME } from "./utils/types";

export default Object.assign(TYPE_type_bool_,
    {
        __class__: TYPE_type,
        __name__ : "bool",
        [JS_NAME]: "Boolean",
    }
);