import { toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { name2SType, STypeName } from "structs/BinaryOperators";


export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    let right = this.children[1];

    const method = name2SType[left.result_type as STypeName][this.value];

    return toJS( method.call_substitute(this, left, right), cursor);
}