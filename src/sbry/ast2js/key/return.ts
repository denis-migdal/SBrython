import { w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const coffset = firstChild(node);

    if( coffset === 0)
        return w_str("return null;");

    return w_sns("return ", coffset, ";");
}