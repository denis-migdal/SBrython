import { w_sns } from "@SBrython/ast2js";
import { firstChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    const idx  = VALUES[node];

    const list = firstChild(node);
    const body = list+1;

    w_sns(`for(var ${idx} of `, list, "){", body, "}");
}