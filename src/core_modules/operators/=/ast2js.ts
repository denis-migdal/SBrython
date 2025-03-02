import { w, wt } from "ast2js";
import { firstChild, nbChild, resultType } from "dop";
import { Number2Int } from "structs/BinaryOperators";
import { STYPE_INT, STYPE_JSINT } from "structs/STypes";

export default function ast2js(node: number) {
    
    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);
    
    for(let i = 1; i < nbChildren; ++i)
        wt`${i+coffset} = `;

    let rchild: any = coffset;
    if( resultType(coffset) === STYPE_JSINT && resultType(node) === STYPE_INT )
        rchild = Number2Int(coffset);

    w(rchild);
}