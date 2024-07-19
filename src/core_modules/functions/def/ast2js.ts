import { args2js, body2js, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS(r`function ${this.value}`, cursor);

    js += args2js(this, cursor);
    js += body2js(this, cursor, 1);

    return js;
}