import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {
    return `"${this.value}"`;
}