import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    let coffset    = firstChild(node);
    let nbChildren = nbChild(node);

    // if
    w_sns("if(", coffset++, "{", coffset++, "}");

    // else if
    let i;
    for(i = 2; i < nbChildren - 1; i += 2) {
        w_sns("else if(", coffset++, "){", coffset++, "}");
    }

    // else
    if( i === nbChildren - 1 )
        w_sns("else {", coffset, "}");
}