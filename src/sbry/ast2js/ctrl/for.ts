import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const idx  = VALUES[node];

    const list = firstChild(node);

    w_sns(`for(var ${idx} of `, list, "){", nextSibling(list), "}");
}