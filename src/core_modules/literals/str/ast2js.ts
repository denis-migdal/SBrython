import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {
    
    if( this.value[0] === '"')
        return w(this.value);
    
    wt`"${this.value}"`;
}