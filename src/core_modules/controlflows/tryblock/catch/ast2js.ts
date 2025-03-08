import { NL, wt } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    // else is handled by tryblock
    if(nbChildren === 1)
        return wt`{${coffset}${NL}}`;

    wt`if(${coffset+1}){${coffset}${NL}}`;
}