import { wt } from "ast2js";
import { firstChild, VALUES } from "dop";

export default function ast2js(node: number) {
    wt`${firstChild(node)}.${VALUES[node]}`;
}