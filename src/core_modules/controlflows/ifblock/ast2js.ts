import { body2js, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.type === "controlflows.ifblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)
            js += toJS(this.children[i], cursor);
        return js;
    }

    //if
    let keyword = "if";
    if( this.type === "controlflows.elif")
        keyword = "else if";
    if( this.type === "controlflows.else")
        keyword = "else";

    let js = toJS(keyword, cursor);
    let offset = 0;
    if( keyword !== "else") {
        offset = 1;
        js += toJS(r`(${this.children[0]})`, cursor);
    }

    js += body2js(this, cursor, offset);

    return js;
}