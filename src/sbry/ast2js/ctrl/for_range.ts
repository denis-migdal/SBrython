import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild, VALUES } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";

export default function ast2js(node: number) {

    const idx  = VALUES[node];

    const body       = firstChild(node);
    const nbChildren = nbChild(node);

    let end = Number2Int(body+1);

    w_str(`for(var ${idx} = `);

    if( nbChildren > 2) {

        w_node(end); // finally it was beg
        end = Number2Int(body+1);

    } else {
        w_str("0n");
    }

    w_sns(`; ${idx} < `, end, `; ${idx} += `);

    if( nbChildren === 4) {
        w_node( Number2Int(body+2) );
    } else {
        w_str("1n");
    }

    w_sns("){", body, "}");
}