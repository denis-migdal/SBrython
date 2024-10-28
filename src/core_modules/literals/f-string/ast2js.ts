import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { SType_str } from "structs/STypes";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("`", cursor);

    for(let child of this.children) {

        if( child.result_type === SType_str) {

            // h4ck
            child.jscode = {
                start: {...cursor},
                end: null as any
            }
            js += toJS(child.value, cursor);
            child.jscode.end = {...cursor};

        } else if(child.type === "literals.f-string.FormattedValue") {
            js += toJS(child, cursor);
        } else
            throw new Error("unsupported");
    }

    js += toJS("`", cursor);

    return js;
}