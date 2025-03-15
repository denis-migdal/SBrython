import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    const body       = firstChild(node);
    const nbChildren = nbChild(node);

    w_str(`class ${VALUES[node]} extends `);

    if( nbChildren === 2)
        w_node(body+1);
    else
        w_str("_r_.object");

    w_sns("{", body, "}");
}