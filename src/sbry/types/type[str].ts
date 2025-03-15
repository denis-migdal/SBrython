import { RET_STR } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { TYPE_type_str_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { firstChild, resultType } from "@SBrython/sbry/dop";
import Types from "./list";
import { w_node } from "@SBrython/sbry/ast2js/ast2js";
import { TYPEID_str } from ".";
import { WRITE_CALL } from "./utils/types";

export default Object.assign(TYPE_type_str_,
    {
        __name__ : "type",
        __call__: method_wrapper(RET_STR, (node) => {

            const other = firstChild(node)+1;
            const other_type = resultType(other);

            //TODO use their __int__ ?
            if( other_type === TYPEID_str ) {
                w_node(other);
                return;
            }

            const otype = Types[other_type];
            if( __DEBUG__ && (otype === undefined || otype.__str__ === undefined) )
                throw new Error(`${otype?.__name__}.__str__ not defined`);

            otype.__str__[WRITE_CALL](node, other);
        })
    }
);