import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const coffset = firstChild(node);
    const cond    = nextSibling(coffset);

    // else is handled by tryblock
    if( cond === 0) {
        w_sns("{", coffset, "}");
        return;
    }

    w_sns("if(", cond, "){", coffset, "}");
}