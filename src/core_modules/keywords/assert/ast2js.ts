import { w_sns } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    return w_sns("_b_.assert(", firstChild(node), ")");
}