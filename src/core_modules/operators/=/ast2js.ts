import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    let js = "";
    if( this.type.endsWith("(init)") )
        js += toJS("var ", cursor);

    js += toJS(r`${this.children[0]} = ${this.children[1]}`, cursor);

    return js;
}