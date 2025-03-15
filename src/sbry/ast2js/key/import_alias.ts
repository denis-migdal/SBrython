import { w_str } from "@SBrython/sbry/ast2js/utils";
import { VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    const value = VALUES[node];
    
    w_str(value[0])

    if( value[1] !== undefined)
        w_str(": " + value[1]);
}