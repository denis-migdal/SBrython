import { NL, wt } from "ast2js";
import { firstChild, VALUES } from "dop";

export default function ast2js(node: number) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    wt`function ${name}(${coffset}){${coffset+1}${NL}}`;
}