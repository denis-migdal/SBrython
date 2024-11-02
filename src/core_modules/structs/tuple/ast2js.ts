import { w } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    w("Object.freeze([");

    if( this.children.length > 0 )
        w(this.children[0]);

    for(let i = 1; i < this.children.length; ++i)
        w(", ", this.children[i]);

    w("])");
}