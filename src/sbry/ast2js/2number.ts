import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild } from "@SBrython/sbry/dop";

export default function(node: number) {
    w_sns("Number(", firstChild(node), ")");
}