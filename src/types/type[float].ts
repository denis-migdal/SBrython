import { RET_FLOAT } from "@SBrython/structs/ReturnTypeFcts";
import { TYPE_type_float_ } from "./bases";
import { method_wrapper } from "./utils/methods";
import { firstChild, resultType, type, VALUES } from "@SBrython/dop";
import { Int2Number } from "@SBrython/structs/Converters";
import { w_node, w_sns, w_str } from "@SBrython/ast2js";
import { LITERALS_STR } from "@SBrython/core_modules/lists";
import Types from "./list";
import { TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_str } from ".";
import { WRITE_CALL } from "./utils/types";

export default Object.assign(TYPE_type_float_,
    {
        __name__ : "type",
        __call__ : method_wrapper(RET_FLOAT, (node: number) => {

            const other = firstChild(node)+1;
            const other_type = resultType(other);

            //TODO use their __int__ ?
            if( other_type === TYPEID_int ) {
                w_node(Int2Number(other));
                return;
            }
            if( other_type === TYPEID_float || other_type === TYPEID_jsint) {
                w_node(other_type);
                return;
            }

            //TODO: power...
            if( other_type === TYPEID_str ) {

                const other_value = VALUES[other];

                if( type(other) === LITERALS_STR ) {
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
                w_sns("parseFloat(", other, ")")
                return;
            }

            const otype = Types[other_type];
            if( __DEBUG__ && (otype === undefined || otype.__int__ === undefined) )
                throw new Error(`${otype?.__name__}.__int__ not defined`);

            otype.__int__[WRITE_CALL]!(node, other);
        }
        )
    },
);