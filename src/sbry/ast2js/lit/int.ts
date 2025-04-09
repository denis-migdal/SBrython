import { w_str } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_int } from "@SBrython/sbry/types";

export default function ast2js(node: NODE_ID) {

    const value = VALUES[node];

    w_str(value);
    if( resultType(node) === TYPEID_int )
        w_str("n");
}