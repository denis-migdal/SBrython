import { w_sns } from "@SBrython/sbry/ast2js/ast2js";
import { firstChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    w_sns(`function ${name}(`, coffset, "){", coffset+1, "}");
}