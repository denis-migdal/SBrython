import { BB, BE, jscode, set_js_cursor, w_NL, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { CODE_BEG, CODE_END, firstChild, nextSibling, NODE_ID, type, VALUES } from "@SBrython/sbry/dop";
import { AST_LIT_STR } from "./list";

export default function ast2js(node: NODE_ID) {

    BB();

    const first    = firstChild(node);
    let cur = first;
    while(cur !== 0) {
        if( jscode.length !== 0 ) w_NL();

        if( type(cur) !== AST_LIT_STR )
            w_node(cur);
        else if(__SBRY_MODE__ === "dev") {
            set_js_cursor(4*(cur as number) + CODE_BEG);
            w_str(`/*${VALUES[cur].slice(1,-1)}*/`);
            set_js_cursor(4*(cur as number) + CODE_END);
        }

        cur = nextSibling(cur);
    }

    BE();

    if(__SBRY_MODE__ === "dev" && first !== 0 && node !== 0)
        w_NL();
}