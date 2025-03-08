import { wt } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {
    wt`throw new _b_.PythonError(${firstChild(node)})`;
}