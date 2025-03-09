import { NL, wt } from "@SBrython/ast2js";
import { firstChild, type, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    wt`function ${name}(${coffset}){${coffset+1}${NL}}`;
}