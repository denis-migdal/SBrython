import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {
    w_sns("throw new _sb_.PythonError(", firstChild(node), ")");
}