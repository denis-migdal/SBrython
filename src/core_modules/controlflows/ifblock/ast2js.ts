import { NL, wt } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    let coffset    = firstChild(node);
    let nbChildren = nbChild(node);

    // if
    wt`if(${coffset++}){${coffset++}${NL}}`;

    // else if
    let i;
    for(i = 2; i < nbChildren - 1; i += 2) {
        wt`else if(${coffset++}){${coffset++}${NL}}`;
    }

    // else
    if( i === nbChildren - 1 )
        wt`else {${coffset}${NL}}`;
}