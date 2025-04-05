import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, NODE_ID } from "@SBrython/sbry/dop";

export default function(node: NODE_ID) {
    w_sns("Number(", firstChild(node), ")");
}