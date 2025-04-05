import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const body       = firstChild(node);
    let cur = nextSibling(body);

    w_str(`class ${VALUES[node]} extends `);

    if( cur === 0) {
        w_str("_r_.object");
    } else if( nextSibling(cur) === 0) {
        w_node(cur);
    } else {
        w_str("_sb_.mix(");
        w_node(cur);
        cur = nextSibling(cur);
        do {
            w_str(", ");
            w_node(cur);
            cur = nextSibling(cur);
        } while(cur !== 0);
        
        w_str(")");
    }
        

    w_sns(" {", body, "}");
}