import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    if( this.value[1] === undefined)
        return w(this.value[0]);

    wt`${this.value[0]}: ${this.value[1]}`;
}