import { w, wt } from "@SBrython/ast2js";
import { firstChild, nbChild, VALUES } from "@SBrython/dop";

export default function ast2js(node: number) {

    w("const {");

    const coffset = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = 0; i < nbChildren; ++i) {
        if( i !== 0)
            w(", ");
        w(i + coffset);
    }

    w('} = ');

    const value = VALUES[node];
    
    if(value === null)
        w("__SBRYTHON__.getModules()");
    else
        wt`__SBRYTHON__.getModule("${value}")`;
}