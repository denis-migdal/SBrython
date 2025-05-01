import { BB, BE, w_NL, w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    let cur    = firstChild(node);

    w_sns("try {", cur, "} catch(_raw_err_){");
    BB();
    w_NL();

        w_str("const _err_ = _sb_.get_py_exception(_raw_err_, __SBRY__)");

        cur = nextSibling(cur);
        if( cur !== 0)
            w_node( cur );

        cur = nextSibling(cur);
        while(cur !== 0) {
            w_NL(); w_str("else "); w_node(cur);
            cur = nextSibling(cur);
        }

        // no "catch all" clause...
        //TODO:
        /*
        if( nextSibling(firstChild(cur)) !== 0 ) {
            w_NL();
            w_str("else { throw _raw_err_ }");
        }
        */

    BE();
    //w_NL(); - no needs ?
}