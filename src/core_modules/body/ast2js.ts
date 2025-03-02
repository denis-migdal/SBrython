import { BB, BE, NL, w } from "ast2js";
import { firstChild, nbChild } from "dop";

export default function ast2js(node: number) {

    w(BB);

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = coffset; i < nbChildren+coffset; ++i)
        w(NL, i);

    w(BE);
}