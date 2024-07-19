import { args2js, body2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    let js = `function ${this.value}`;
    cursor.col += js.length;

    js += args2js(this, cursor);
    js += body2js(this, cursor, 1);

    return js;
}