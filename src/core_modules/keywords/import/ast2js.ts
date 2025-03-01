import { w, wt } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    w("const {");

    for(let i = 0; i < node.children.length; ++i) {
        if( i !== 0)
            w(", ");
        w(node.children[i]);
    }

    w('} = ');

    const value = VALUES[node.id];
    
    if(value === null)
        w("__SBRYTHON__.getModules()");
    else
        wt`__SBRYTHON__.getModule("${value}")`;
}