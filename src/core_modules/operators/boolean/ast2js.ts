import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { multi_jsop } from "structs/BinaryOperators";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    return toJS( multi_jsop(this, this.value, ...this.children) , cursor);
}