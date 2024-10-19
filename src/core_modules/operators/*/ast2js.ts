import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let left : any = this.children[0];
    let right: any = this.children[1];

    if( left.result_type !== right.result_type ) {
        if( left.result_type === 'int')
            left = r`Number(${left})`;
        if( right.result_type === 'int')
            right = r`Number(${right})`;
    }

    return toJS(r`${left} * ${right}`, cursor);
}