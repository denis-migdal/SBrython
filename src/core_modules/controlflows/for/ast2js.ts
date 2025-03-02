import { NL, wt } from "ast2js";
import { firstChild, VALUES } from "dop";

export default function ast2js(node: number) {

    const idx  = VALUES[node];

    const list = firstChild(node);
    const body = list+1;

    wt`for(var ${idx} of ${list}){${body}${NL}}`;
}