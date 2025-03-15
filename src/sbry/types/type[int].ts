import { RET_INT } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { TYPE_type_int_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { firstChild, resultType } from "@SBrython/sbry/dop";
import { w_node, w_sns } from "@SBrython/sbry/ast2js/utils";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import Types from "./index";
import { TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_str } from ".";
import { WRITE_CALL } from "./utils/types";

export default Object.assign(TYPE_type_int_,
    {
        __name__ : "type",
        __call__: method_wrapper(RET_INT, (node: number) => {

            const other = firstChild(node) + 1;
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

            const otype = Types[other_type];
            if( __DEBUG__ && (otype === undefined || otype.__int__ === undefined) )
                throw new Error(`${otype?.__name__}.__int__ not defined`);

            otype.__int__![WRITE_CALL](node, other);
        })
    }
);