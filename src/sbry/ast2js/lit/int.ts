import { w_str } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_int } from "@SBrython/sbry/types/list";

export default function ast2js(node: NODE_ID) {

    const value = VALUES[node];

    w_str(value);
    if( __SBRY_COMPAT__ !== "NONE" && resultType(node) === TYPEID_int )
        w_str("n");
}