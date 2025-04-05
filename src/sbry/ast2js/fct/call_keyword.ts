import { w_node } from "@SBrython/sbry/ast2js/utils";
import { firstChild, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    w_node( firstChild(node) );
}