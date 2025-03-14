import { w_sns } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function(node: number) {
    w_sns("Number(", firstChild(node), ")");
}