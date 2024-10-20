import { toJS } from "ast2js";
import SType_int, { reversed_operator, SType_NOT_IMPLEMENTED } from "core_modules/literals/int/stype";
import { ASTNode, CodePos } from "structs/ASTNode";

const name2SType = {
    "int": SType_int
}
type STypeName = keyof typeof name2SType;

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left  = this.children[0];
    let right = this.children[1];

    const op = "__add__"; //TODO find by node name...

    console.warn(left.result_type);
    let method = name2SType[left.result_type as STypeName][op];

    //TODO: reverse during ASTConversion + set type during ASTConversion

    // try reversed operator
    if( method.return_type(right.result_type!) === SType_NOT_IMPLEMENTED) {
        const rop = reversed_operator(op);
        method = name2SType[right.result_type as STypeName][rop];
        [left, right] = [right, left];

        if( method.return_type(right.type) === SType_NOT_IMPLEMENTED)
            throw new Error('NOT IMPLEMENTED!');
    }

    return toJS( method.substitute(this, left, right), cursor);
}