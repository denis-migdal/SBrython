import { w_sns } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    // else is handled by tryblock
    if(nbChildren === 1) {
        w_sns("{", coffset, "}");
        return;
    }

    w_sns("if(", coffset+1, "){", coffset, "}");
}