import { w_node } from "@SBrython/ast2js";
import { firstChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    w_node( firstChild(node) );
}