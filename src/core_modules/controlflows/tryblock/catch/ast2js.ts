import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = "";
    
        let body_idx = 1;
        if(this.children.length === 1) { //TODO empty node...
            js += toJS("else {", cursor);
            body_idx = 0;
        } else {
            js += toJS(r`if(_err_ instanceof ${this.children[0]}){`, cursor);
        }
        if( this.value !== null) {
            js+= newline(this, cursor, 1);
            js+= toJS(`let ${this.value} = _err_;`, cursor);
        }
        js+= body2js(this, cursor, body_idx, false);
        js+= newline(this, cursor);
        js+= toJS("}", cursor);
    return js;
}