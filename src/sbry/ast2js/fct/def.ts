import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    w_sns(`function ${name}(`, coffset, "){", nextSibling(coffset), "}");
}