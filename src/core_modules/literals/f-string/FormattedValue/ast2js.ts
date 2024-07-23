import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("${", cursor);
        js+= toJS(this.children[0], cursor);
        js+= toJS("}", cursor);
    return js;
}