import { w, wt } from "ast2js";
import { firstChild, nbChild } from "dop";

export default function ast2js(node: number) {

    w('{');

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);

    if( nbChildren > 0 )
        wt`${coffset}: ${coffset+1}`;

    for(let i = 2; i < nbChildren; i+=2)
        wt`, ${i+coffset}: ${i+1+coffset}`;

    w('}');
}