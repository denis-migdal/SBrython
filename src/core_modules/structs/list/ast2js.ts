import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("[", cursor);

    for(let i = 0; i < this.children.length; ++i) {
        if(i !== 0)
            js+= toJS(", ", cursor);
        js += toJS(this.children[i], cursor);
    }

        js+= toJS("]", cursor);

    return js;
}