import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";
import { w_sns } from "../utils";

export default function ast2js(node: NODE_ID) {

    const fist = firstChild(node);

    w_sns("else if(", fist, ") {", nextSibling(fist), "}");
}