import { jscode_cursor, w } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { SType_str } from "structs/STypes";

export default function ast2js(this: ASTNode) {

    w("`");

    for(let child of this.children) {

        if( child.result_type === SType_str) {

            const start = jscode_cursor();

            w(child.value);

            child.jscode = {
                start,
                end: jscode_cursor()
            };

        } else if(child.type === "literals.f-string.FormattedValue") {
            w(child);
        } else
            throw new Error("unsupported");
    }

    w("`");
}