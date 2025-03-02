import { w } from "ast2js";
import { VALUES } from "dop";

export default function ast2js(node: number) {

    // force str write (else might assume this is an AST node ID)...
    w(`${VALUES[node]}`);
}