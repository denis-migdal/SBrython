import { w_sns } from "@SBrython/ast2js";
import { firstChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    w_sns(`function ${name}(`, coffset, "){", coffset+1, "}");
}