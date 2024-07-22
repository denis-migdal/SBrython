import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.type === "controlflows.tryblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)
            js += toJS(this.children[i], cursor);
        return js;
    }

    if( this.type === "controlflows.try") {
        let js = toJS("try", cursor);
            js+= body2js(this, cursor);
        return js;
    }

    return ""; //TODO...
}