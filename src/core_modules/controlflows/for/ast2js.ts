import { NL, wt } from "@SBrython/ast2js";
import { firstChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    const idx  = VALUES[node];

    const list = firstChild(node);
    const body = list+1;

    wt`for(var ${idx} of ${list}){${body}${NL}}`;
}