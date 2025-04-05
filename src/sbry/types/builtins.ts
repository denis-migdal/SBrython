import Types, { TYPEID_type, TYPEID_type_float_, TYPEID_type_int_, TYPEID_type_str_ } from ".";
import { w_node, w_str } from "../ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType } from "../dop";
import { RET_INT, RET_None, RETURN_TYPE_FCT } from "../structs/ReturnTypeFcts";
import { addType } from "./utils/addType";
import { method_wrapper } from "./utils/methods";
import { Callable, WRITE_CALL } from "./utils/types";

// builtin symbols.
export default {
    int  : TYPEID_type_int_,
    str  : TYPEID_type_str_,
    float: TYPEID_type_float_,
    type : TYPEID_type,
    len  : addType( genUnaryOpFct("len", RET_INT)),
    abs  : addType( genUnaryOpFct("abs", RET_INT)), //TODO...
    print: addType({
        __name__: "print",
        __call__: method_wrapper(RET_None, (call:NODE_ID) => {
            const coffset  = firstChild(call);

            w_str("__SB__.print(");
            let cur = nextSibling(coffset);
            while(cur !== 0) {
                w_node(cur);
                w_str(", ");
                cur = nextSibling(cur);
            }
            w_str(")");
        })
    }),
};

//TODO: move...
//TODO: binary/unary
//TODO: remove return_type (get from the __{name}__)
function genUnaryOpFct(name: string, return_type: RETURN_TYPE_FCT) {
    const opname = `__${name}__`;
    return {
        __name__ : name,
        __call__ : method_wrapper(return_type, (call: NODE_ID) => {
            const left   = nextSibling(firstChild(call));
            const method = Types[resultType(left)]![opname] as Callable;
            return method.__call__[WRITE_CALL](call);
        })
    }
}