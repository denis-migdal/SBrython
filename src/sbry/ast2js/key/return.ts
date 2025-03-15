import { w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    const coffset = firstChild(node);

    if( coffset === 0)
        return w_str("return null;");

    return w_sns("return ", coffset, ";");
}