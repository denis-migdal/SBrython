import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.value[1] === undefined)
        return toJS(this.value[0], cursor);

    return toJS(`${this.value[0]}: ${this.value[1]}`, cursor);
}