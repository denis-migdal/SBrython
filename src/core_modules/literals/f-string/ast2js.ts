import { set_js_cursor, w } from "ast2js";
import { LITERALS_F_STRING_FORMATTEDVALUE } from "core_modules/lists";
import { CODE_BEG, CODE_END, VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { STYPE_STR } from "structs/STypes";

export default function ast2js(node: ASTNode) {

    w("`");

    for(let child of node.children) {

        if( child.result_type === STYPE_STR) {

            const offset = 4*child.id;
            set_js_cursor(offset + CODE_BEG);

            w(VALUES[child.id]);

            set_js_cursor(offset + CODE_END);

        } else if(child.type_id === LITERALS_F_STRING_FORMATTEDVALUE) {
            w(child);
        } else
            throw new Error("unsupported");
    }

    w("`");
}