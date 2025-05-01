import { w_sns } from "@SBrython/sbry/ast2js/utils";
import { firstChild, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    if( __SBRY_MODE__ !== "prod")
        w_sns("assert(", firstChild(node), ")");
}