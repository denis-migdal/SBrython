import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    w("const {");

    for(let i = 0; i < this.children.length; ++i) {
        if( i !== 0)
            w(", ");
        w(this.children[i]);
    }

    w('} = ');
    
    if(this.value === null)
        w("__SBRYTHON__.getModules()");
    else
        wt`__SBRYTHON__.getModule("${this.value}")`;
}