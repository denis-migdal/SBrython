import { wt } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {
    
    wt`${this.children[0]}[${this.children[1]}]`;
}