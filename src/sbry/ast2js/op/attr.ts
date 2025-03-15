import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {
    w_node(firstChild(node)); w_str(`.${VALUES[node]}`);
}