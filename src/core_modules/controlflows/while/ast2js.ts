import { body2js, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS(r`while(${this.children[0]})`, cursor);
    js += body2js(this, cursor, 1);

    return js;
}