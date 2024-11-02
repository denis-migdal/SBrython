import { w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    w('{');

    if( this.children.length > 0 )
        wt`${this.children[0]}: ${this.children[1]}`;

    for(let i = 2; i < this.children.length; i+=2)
        wt`, ${this.children[i]}: ${this.children[i+1]}`;

    w('}');
}