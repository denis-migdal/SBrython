import { w_str } from "@SBrython/ast2js";
import { VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {
    w_str(`'${VALUES[node]}'`);
}