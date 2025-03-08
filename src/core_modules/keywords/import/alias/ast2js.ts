import { w } from "@SBrython/ast2js";
import { VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    const value = VALUES[node];
    
    w(value[0])

    if( value[1] !== undefined)
        w(": ", value[1]);
}