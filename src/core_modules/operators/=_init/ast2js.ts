import { w_node, w_str } from "@SBrython/ast2js";
import { firstChild, nbChild, resultType } from "@SBrython/dop";
import { Number2Int } from "@SBrython/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/types";

export default function ast2js(node: number) {
    
    w_str("var ");

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);
    
    for(let i = 1; i < nbChildren; ++i) {
        w_node(i+coffset);
        w_str(" = ");
    }

    let rchild: number = coffset;
    if( resultType(coffset) === TYPEID_jsint && resultType(node) === TYPEID_int )
        rchild = Number2Int(coffset);

    w_node(rchild);
}