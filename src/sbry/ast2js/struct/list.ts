import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    w_str("[");

    let cur = firstChild(node);
    while(cur !== 0) {

        w_node(cur);
        w_str(", ");

        cur = nextSibling(cur);
    }

    w_str("]");
}