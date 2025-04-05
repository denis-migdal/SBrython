import { w_str } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    // force str write (else might assume this is an AST node ID)...
    w_str(`${VALUES[node]}`);
}