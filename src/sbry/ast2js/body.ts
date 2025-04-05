import { BB, BE, w_NL, w_node } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    BB();

    const first    = firstChild(node);
    let cur = first;
    while(cur !== 0) {
        w_NL(); w_node(cur);
        cur = nextSibling(cur);
    }

    BE();

    if(__DEBUG__ && first !== 0 && node !== 0)
        w_NL();
}