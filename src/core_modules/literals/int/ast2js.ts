import { w_str } from "@SBrython/ast2js";
import { resultType, VALUES } from "@SBrython/dop";
import { TYPEID_int } from "@SBrython/types";

export default function ast2js(node: number) {

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