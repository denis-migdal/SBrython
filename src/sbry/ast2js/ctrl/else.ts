import { firstChild, NODE_ID } from "@SBrython/sbry/dop";
import { w_sns } from "../utils";

export default function ast2js(node: NODE_ID) {
    w_sns("else {", firstChild(node), "}");
}