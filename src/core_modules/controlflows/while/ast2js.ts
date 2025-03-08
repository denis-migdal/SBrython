import { NL, wt } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset = firstChild(node);

    wt`while(${coffset}){${coffset+1}${NL}}}`;
}