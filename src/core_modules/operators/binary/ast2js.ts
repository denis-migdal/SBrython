import { toJS } from "ast2js";
import SType_float from "core_modules/literals/float/stype";
import SType_int from "core_modules/literals/int/stype";
import { ASTNode, CodePos } from "structs/ASTNode";

export const name2SType = {
    "int"  : SType_int,
    "float": SType_float
}
export type STypeName = keyof typeof name2SType;

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    let right = this.children[1];

    const method = name2SType[left.result_type as STypeName][this.value];

    return toJS( method.call_substitute(this, left, right), cursor);
}