import { w_node, w_str } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    w_str("[");

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);
    
    for(let i = 0; i < nbChildren; ++i) {
        w_node(i + coffset);
        w_str(", ");
    }

    w_str("]");
}