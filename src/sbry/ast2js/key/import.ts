import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    w_str("const {");

    let cur = firstChild(node);
    w_node(cur);
    cur = nextSibling(cur);

    while(cur !== 0) {

        w_str(", "); w_node(cur);
        cur = nextSibling(cur);
    }

    w_str('} = ');

    const value = VALUES[node];
    
    if(value === null)
        w_str("__SBRY__.getModules()");
    else
        w_str(`__SBRY__.getModule("${value}")`);
}