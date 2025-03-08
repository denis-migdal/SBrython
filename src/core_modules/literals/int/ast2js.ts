import { w } from "@SBrython/ast2js";
import { resultType, VALUES } from "@SBrython/dop";
import { STYPE_INT } from "@SBrython/structs/STypes";

export default function ast2js(node: number) {

    let value = VALUES[node];

    if( resultType(node) === STYPE_INT ) {
        // force str write (else might assume this is an AST node ID)...
        w(`${value}n`); 
        return;
    }
    if( typeof value === "bigint" )
        value = Number(value); // remove useless precision.

    // force str write (else might assume this is an AST node ID)...
    w(`${value}`);
}