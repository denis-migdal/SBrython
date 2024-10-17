import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    if( this.value[0] === '"')
        return toJS(r`${this.value}`, cursor);
    return toJS(r`"${this.value}"`, cursor);
}