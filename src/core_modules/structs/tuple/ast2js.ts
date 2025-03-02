import { w } from "ast2js";
import { firstChild, nbChild } from "dop";

export default function ast2js(node: number) {

    w("Object.freeze([");

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);

    if( nbChildren > 0 )
        w(coffset);

    for(let i = 1; i < nbChildren; ++i)
        w(", ", i + coffset);

    w("])");
}