import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    //TODO: better...
    let op = "==";
    if( this.type.endsWith('(is)') )
        op = "===";

    //TODO None type...
    //TODO str

    return toJS(r`${this.children[0]} ${op} ${this.children[1]}`, cursor);
}