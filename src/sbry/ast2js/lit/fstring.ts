import { set_js_cursor, w_node, w_str } from "@SBrython/sbry/ast2js/ast2js";
import { AST_LIT_FSTRING_FVAL } from "@SBrython/sbry/ast2js/";
import { CODE_BEG, CODE_END, firstChild, nbChild, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_str } from "@SBrython/sbry/types";

export default function ast2js(node: number) {

    w_str("`");

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = coffset; i < nbChildren + coffset; ++i) {

        if( resultType(i) === TYPEID_str) {

            const offset = 4*i;

            // we write the children directly...
            if(__DEBUG__) set_js_cursor(offset + CODE_BEG);
            w_node(VALUES[i]);
            if(__DEBUG__) set_js_cursor(offset + CODE_END);

            continue;

        }
        
        if( type(i) === AST_LIT_FSTRING_FVAL) {
            w_node(i);
            continue;
        }
        
        throw new Error("unsupported");
    }

    w_str("`");
}