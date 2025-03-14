import { w_sns, w_str } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset = firstChild(node);

    if( coffset === 0)
        return w_str("return null;");

    return w_sns("return ", coffset, ";");
}