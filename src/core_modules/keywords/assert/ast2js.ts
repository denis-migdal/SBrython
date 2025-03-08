import { wt } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    return wt`_b_.assert(${firstChild(node)})`;
}