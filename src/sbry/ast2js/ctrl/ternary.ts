import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    let cur = firstChild(node);
    w_sns("(", cur, "?", cur = nextSibling(cur), " : ", nextSibling(cur), ")");
}