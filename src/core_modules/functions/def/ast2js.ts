import { args2js, body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS(r`function ${this.value}`, cursor);

    js += args2js(this, cursor);
    js += toJS("{", cursor);
    js += body2js(this, cursor, 1, false);

    const body = this.children[1].children;
    if( body[body.length - 1].type !== "keywords.return" ) {
        js += newline(this, cursor, 1);
        js += "return null;"
    }

    js += newline(this, cursor, 0) + toJS("}", cursor);

    return js;
}