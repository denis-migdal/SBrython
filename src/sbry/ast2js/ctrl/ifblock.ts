import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    let cur    = firstChild(node);

    // if
    w_sns("if(", cur, "){", cur = nextSibling(cur), "}");
    cur = nextSibling(cur);

    // else if
    while(cur !== 0) {

        let cond: NODE_ID = cur;
        cur = nextSibling(cur);

        if( cur !== 0)
            w_sns("else if(", cond, "){", cur, "}");
        else
            w_sns("else {", cond, "}");

        cur = nextSibling(cur);
    }   
}