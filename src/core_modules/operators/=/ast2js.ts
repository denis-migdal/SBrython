import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    let js = "";
    if( this.type.endsWith("(init)") )
        js += toJS("var ", cursor);

    js += toJS(this.children[0], cursor);
    for(let i = 1; i < this.children.length; ++i)
        js += toJS(r` = ${this.children[i]}`, cursor);

    return js;
}