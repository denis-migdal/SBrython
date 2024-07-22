import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS(r`if(_err_ instanceof ${this.children[0]}){`, cursor);
        js+= newline(this, cursor, 1);
        js+= `let ${this.value} = _err_;`;
        js+= body2js(this, cursor, 1, false);
        js+= newline(this, cursor);
        js+= toJS("}", cursor);
    return js;
}