import { set_js_cursor, w } from "@SBrython/ast2js";
import { LITERALS_F_STRING_FORMATTEDVALUE } from "@SBrython/core_modules/lists";
import { CODE_BEG, CODE_END, firstChild, nbChild, resultType, type, VALUES } from "@SBrython/dop";
import { STYPE_STR } from "@SBrython/structs/STypes";

export default function ast2js(node: number) {

    w("`");

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = coffset; i < nbChildren + coffset; ++i) {

        if( resultType(i) === STYPE_STR) {

            const offset = 4*i;

            // we write the children directly...
            if(__DEBUG__) set_js_cursor(offset + CODE_BEG);
            w(VALUES[i]);
            if(__DEBUG__) set_js_cursor(offset + CODE_END);

            continue;

        }
        
        if( type(i) === LITERALS_F_STRING_FORMATTEDVALUE) {
            w(i);
            continue;
        }
        
        throw new Error("unsupported");
    }

    w("`");
}