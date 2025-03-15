import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    return w_sns("_sb_.assert(", firstChild(node), ")");
}