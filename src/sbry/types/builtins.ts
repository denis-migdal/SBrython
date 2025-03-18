import Types, { TYPEID_type, TYPEID_type_float_, TYPEID_type_int_, TYPEID_type_str_ } from ".";
import { w_node, w_str } from "../ast2js/utils";
import { firstChild, nbChild, resultType } from "../dop";
import { RET_INT, RET_None, RETURN_TYPE_FCT } from "../structs/ReturnTypeFcts";
import { addType } from "./utils/addType";
import { method_wrapper } from "./utils/methods";
import { Fct, WRITE_CALL } from "./utils/types";

// builtin symbols.
export default {
    int  : TYPEID_type_int_,
    str  : TYPEID_type_str_,
    float: TYPEID_type_float_,
    type : TYPEID_type,
    len  : addType("len", genUnaryOpFct("len", RET_INT)),
    print: addType("print", {
        __call__: method_wrapper(RET_None, (call:number) => {
            const coffset  = firstChild(call);
            const nb_child = nbChild(call);

            w_str("__SB__.print(");
            for(let i = 1; i < nb_child; ++i) {
                w_node(coffset + i);
                w_str(", ");
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
        //__name__ : name,
        __call__ : method_wrapper(return_type, (call: number) => {
            const left   = firstChild(call)+1;
            const method = Types[resultType(left)]![opname] as Fct;
            return method[WRITE_CALL](call);
        })
    }
}