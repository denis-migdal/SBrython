import { wt } from "@SBrython/ast2js";
import { firstChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {
    wt`${firstChild(node)}.${VALUES[node]}`;
}