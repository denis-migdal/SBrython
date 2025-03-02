import { wt } from "ast2js";
import { firstChild } from "dop";

export default function ast2js(node: number) {

    return wt`_b_.assert(${firstChild(node)})`;
}