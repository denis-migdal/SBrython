import { w_node, w_str } from "@SBrython/ast2js";
import { firstChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {
    w_node(firstChild(node)); w_str(`.${VALUES[node]}`);
}