import { BB, BE, w_NL, w_node } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    BB();

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = coffset; i < nbChildren+coffset; ++i) {
        w_NL(); w_node(i);
    }

    BE();

    if(__DEBUG__ && nbChildren !== 0 && node !== 0)
        w_NL();
}