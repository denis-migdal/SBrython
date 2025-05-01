import { BB, BE, jscode, w_NL, w_node } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    BB();

    const first    = firstChild(node);
    let cur = first;
    while(cur !== 0) {
        if( jscode.length !== 0 ) w_NL();
        w_node(cur);
        cur = nextSibling(cur);
    }

    BE();

    if(__SBRY_MODE__ === "dev" && first !== 0 && node !== 0)
        w_NL();
}