import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {
    wt`throw new _b_.PythonError(${this.children[0]})`;
}