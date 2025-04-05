import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";

export default function ast2js(node: NODE_ID) {

    const idx  = VALUES[node];

    const body       = firstChild(node);

    let cur = nextSibling(body);
    let end = Number2Int(cur);

    w_str(`for(var ${idx} = `);

    cur = nextSibling(cur);
    if( cur !== 0) {

        w_node(end); // finally it was beg
        end = Number2Int(cur);
    } else {
        w_str("0n");
    }

    w_sns(`; ${idx} < `, end, `; ${idx} += `);

    cur = nextSibling(cur);
    if( cur !== 0) {
        w_node( Number2Int(cur) );
    } else {
        w_str("1n");
    }

    w_sns("){", body, "}");
}