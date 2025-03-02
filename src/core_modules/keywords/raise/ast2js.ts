import { wt } from "ast2js";
import { firstChild } from "dop";

export default function ast2js(node: number) {
    wt`throw new _b_.PythonError(${firstChild(node)})`;
}