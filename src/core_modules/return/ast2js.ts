import { w, wt } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset = firstChild(node);

    if( coffset === 0)
        return w("return null");

    return wt`return ${coffset}`;
}