import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = "";

    js += toJS("const {", cursor);
    for(let i = 0; i < this.children.length; ++i) {
        if( i !== 0)
            js += toJS(", ", cursor );
        js += toJS( this.children[i], cursor );
    }
    js += toJS("} = ", cursor);
    
    if(this.value === null)
        js += toJS("__SBRYTHON__.getModules()", cursor);
    else
        js += toJS(`__SBRYTHON__.getModule("${this.value}")`, cursor);

    return js;
}