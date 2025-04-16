import { firstChild, NODE_ID, VALUES } from "@SBrython/sbry/dop";
import { w_node, w_str } from "../utils";

export default function ast2js(node: NODE_ID) {
    w_str(`${VALUES[node]}: `); // arg name
    w_node( firstChild(node) );
}