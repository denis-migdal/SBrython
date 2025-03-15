import { w_str } from "@SBrython/sbry/ast2js/ast2js";
import { VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    // force str write (else might assume this is an AST node ID)...
    w_str(`${VALUES[node]}`);
}