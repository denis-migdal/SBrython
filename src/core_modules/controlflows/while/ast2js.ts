import { w_sns } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset = firstChild(node);

    w_sns("while(", coffset, "){", coffset+1, "}");
}