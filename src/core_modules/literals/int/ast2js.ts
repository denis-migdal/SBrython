import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( (this as any).asFloat ) // opti
        return toJS(r`${this.value}`, cursor);        

    return toJS(r`${this.value}n`, cursor);
}