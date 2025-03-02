import { NL, wt } from "ast2js";
import { firstChild, nbChild, VALUES } from "dop";
import { Number2Int } from "structs/BinaryOperators";

export default function ast2js(node: number) {

    const idx  = VALUES[node];

    const body       = firstChild(node);
    const nbChildren = nbChild(node);

    let beg : string|number|any  = "0n";
    let incr: string|number|any  = "1n";

    let end = Number2Int(body+1);

    if( nbChildren > 2) {
        beg = end;
        end = Number2Int(body+1);
    }

    if( nbChildren === 4)
        incr = Number2Int(body+2);

    return wt`for(var ${idx} = ${beg}; ${idx} < ${end}; ${idx} += ${incr}){${body}${NL}}`;
}