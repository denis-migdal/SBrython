import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Body } from "structs/Body";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let base: string|ASTNode = "_r_.object";
    if( this.children.length === 2)
        base = this.children[0];

    return toJS(r`class ${this.value} extends ${base} ${new Body(this)}`, cursor);
}