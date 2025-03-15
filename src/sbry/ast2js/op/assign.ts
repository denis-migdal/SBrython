import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild, resultType } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types";

export default function ast2js(node: number) {
    
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