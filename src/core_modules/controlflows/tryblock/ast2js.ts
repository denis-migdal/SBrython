import { BB, BE, w_NL, w_node, w_sns, w_str } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    w_sns("try {", coffset, "} catch(_raw_err_){");
    BB();
    w_NL();

        w_str("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");

        if( nbChildren > 1)
            w_node( 1+coffset );

        for(let i = 2; i < nbChildren; ++i) {
            w_NL(); w_str("else "); w_node(i + coffset);
        }

        // no "catch all" clause...
        if( nbChild(coffset + nbChildren-1) !== 1) {
            w_NL();
            w_str("else { throw _raw_err_ }");
        }

    BE();
    //w_NL(); - no needs ?
}