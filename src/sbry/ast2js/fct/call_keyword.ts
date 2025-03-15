import { w_node } from "@SBrython/sbry/ast2js/utils";
import { firstChild } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    w_node( firstChild(node) );
}