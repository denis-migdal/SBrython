import { w_str } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_int } from "@SBrython/sbry/types";

export default function ast2js(node: NODE_ID) {

    let value = VALUES[node];

    if( resultType(node) === TYPEID_int ) {
        // force str write (else might assume this is an AST node ID)...
        w_str(`${value}n`); 
        return;
    }
    if( typeof value === "bigint" )
        value = Number(value); // remove useless precision.

    // force str write (else might assume this is an AST node ID)...
    w_str(`${value}`);
}