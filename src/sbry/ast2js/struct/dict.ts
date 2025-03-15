import { w_sns, w_str } from "@SBrython/sbry/ast2js/ast2js";
import { firstChild, nbChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    w_str('{');

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);

    for(let i = 0; i < nbChildren; i+=2)
        w_sns("", i+coffset, ": ", i+1+coffset, ", ");

    w_str('}');
}