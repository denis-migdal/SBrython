import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {
    w_node(firstChild(node)); w_str(`.${VALUES[node]}`);
}