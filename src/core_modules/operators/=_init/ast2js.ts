import { w, wt } from "@SBrython/ast2js";
import { firstChild, nbChild, resultType } from "@SBrython/dop";
import { Number2Int } from "@SBrython/structs/BinaryOperators";
import { STYPE_INT, STYPE_JSINT } from "@SBrython/structs/STypes";

export default function ast2js(node: number) {
    
    w("var ");

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);
    
    for(let i = 1; i < nbChildren; ++i)
        wt`${i+coffset} = `;

    let rchild: any = coffset;
    if( resultType(coffset) === STYPE_JSINT && resultType(node) === STYPE_INT )
        rchild = Number2Int(coffset);

    w(rchild);
}