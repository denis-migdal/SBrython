import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const coffset = firstChild(node);

    w_sns("while(", coffset, "){", nextSibling(coffset), "}");
}