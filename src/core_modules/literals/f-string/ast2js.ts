import { set_js_cursor, w } from "ast2js";
import { LITERALS_F_STRING_FORMATTEDVALUE } from "core_modules/lists";
import { CODE_BEG, CODE_END, firstChild, nbChild, resultType, type, VALUES } from "dop";
import { STYPE_STR } from "structs/STypes";

export default function ast2js(node: number) {

    w("`");

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    for(let i = coffset; i < nbChildren + coffset; ++i) {

        if( resultType(i) === STYPE_STR) {

            const offset = 4*i;

            // we write the children directly...
            set_js_cursor(offset + CODE_BEG);
            w(VALUES[i]);
            set_js_cursor(offset + CODE_END);

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