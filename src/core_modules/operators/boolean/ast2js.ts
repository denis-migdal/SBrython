import { wr } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { multi_jsop } from "structs/BinaryOperators";

export default function ast2js(this: ASTNode) {
    wr( multi_jsop(this, this.value, ...this.children) );
}