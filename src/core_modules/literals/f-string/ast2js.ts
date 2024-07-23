import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("`", cursor);

    for(let child of this.children) {

        if( child.result_type === "str")
            js += toJS(child, cursor);
        else if(child.type === "literals.f-string.FormattedValue") {
            js += toJS("${", cursor);
            js += toJS(child, cursor);
            js += toJS("}", cursor);
        } else
            throw new Error("unsupported");
    }

    js += toJS("`", cursor);

    return js;
}