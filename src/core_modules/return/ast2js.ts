import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.children.length === 0)
        return toJS("return", cursor);

    return toJS(r`return ${this.children[0]}`, cursor);
}