import { body2js, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Body } from "structs/Body";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    const body = new Body(this);

    return toJS(r`try${body}`, cursor);
}