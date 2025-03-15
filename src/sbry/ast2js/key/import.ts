import { w_node, w_str } from "@SBrython/sbry/ast2js/ast2js";
import { firstChild, nbChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    w_str("const {");

    const coffset = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = 0; i < nbChildren; ++i) {
        w_node(i + coffset); w_str(", ");
    }

    w_str('} = ');

    const value = VALUES[node];
    
    if(value === null)
        w_str("__SB__.getModules()");
    else
        w_str(`__SB__.getModule("${value}")`);
}