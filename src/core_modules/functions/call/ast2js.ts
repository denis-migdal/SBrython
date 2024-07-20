import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = "";
    if( this.children[0].result_type?.startsWith("class.") )
        js+= toJS("new ", cursor);
    
    js += toJS(r`${this.children[0]}(`, cursor);

    //TODO: args node...
    for(let i = 1; i < this.children.length; ++i) {

        if( i !== 1)
            js += toJS(", ", cursor);
        
        js += toJS(this.children[i], cursor);
    }

    js += toJS(")", cursor);

    return js;
}