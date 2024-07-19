import { astnode2js, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS(r`${this.children[0]}(`, cursor);

    //TODO: args node...
    for(let i = 1; i < this.children.length; ++i) {

        if( i !== 1)
            js += toJS(", ", cursor);
        
        js += astnode2js(this.children[i], cursor);
    }

    js += toJS(")", cursor);

    return js;
}