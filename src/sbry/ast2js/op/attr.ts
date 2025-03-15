import { w_node, w_str } from "@SBrython/sbry/ast2js/ast2js";
import { firstChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {
    w_node(firstChild(node)); w_str(`.${VALUES[node]}`);
}