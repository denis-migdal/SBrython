import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("if(true)", cursor); //TODO...
        js+= body2js(this, cursor, 0);

    return js;
}