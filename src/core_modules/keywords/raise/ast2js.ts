import { w_sns } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {
    w_sns("throw new _b_.PythonError(", firstChild(node), ")");
}