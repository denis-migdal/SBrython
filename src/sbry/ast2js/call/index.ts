import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, type, VALUES } from "@SBrython/sbry/dop";
import { WRITE_CALL } from "@SBrython/sbry/types/utils/types";
import { AST_CALL_ARG_KW } from "../list";

export function default_call(node: NODE_ID) {

    let cur = firstChild(node);

    w_node(cur);
    w_str('( ');

    while( (cur = nextSibling(cur)) !== 0 && type(cur) !== AST_CALL_ARG_KW) {
        w_node(cur);
        w_str(", ");
    }

    if( cur !== 0) {

        w_str("_sb_.kw({");

        w_node(cur);

        while( (cur = nextSibling(cur)) !== 0 ) {
            w_str(", ");
            w_node(cur);
        }

        w_str("}) ");
    }

    w_str(')');
}

export default function ast2js(node: NODE_ID) {

    //const fct_type = types[resultType(firstChild(node))] as Callable;

    VALUES[node].__call__[WRITE_CALL]!(node);
}