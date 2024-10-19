import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    return toJS(r`${this.children[0]} / ${this.children[1]}`, cursor);
}