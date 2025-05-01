import { set_js_cursor, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { AST_LIT_FSTRING_FVAL } from "@SBrython/sbry/ast2js/list";
import { CODE_BEG, CODE_END, firstChild, nextSibling, NODE_ID, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_str } from "@SBrython/sbry/types/list";

export default function ast2js(node: NODE_ID) {

    w_str("`");

    let cur    = firstChild(node);
    while( cur !== 0) {

        if( resultType(cur) === TYPEID_str) {

            // we write the children directly...
            if(__SBRY_MODE__ === "dev") set_js_cursor( (cur as any as number)*4 + CODE_BEG);
            w_node(VALUES[cur]);
            if(__SBRY_MODE__ === "dev") set_js_cursor( (cur as any as number)*4 + + CODE_END);
        } else if( type(cur) === AST_LIT_FSTRING_FVAL) {
            w_node(cur);
        } else {
            throw new Error("unsupported");
        }
        
        cur = nextSibling(cur);
    }

    w_str("`");
}