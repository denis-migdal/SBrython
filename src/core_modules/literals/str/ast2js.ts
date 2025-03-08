import { wt } from "@SBrython/ast2js";
import { VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {
    wt`'${VALUES[node]}'`;
}