import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    return toJS(r`_b_.assert(${this.children[0]})`, cursor);
}