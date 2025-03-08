import { w } from "@SBrython/ast2js";
import { VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {
    w( VALUES[node] );
}