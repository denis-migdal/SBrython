import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let suffix = "";
    let target = (this as any).as;

    let value = this.value;

    if(target === "float") {
        if( this.result_type === "int" )
            value = Number(value); // remove useless precision.
    }
    else if( target === "int" || this.result_type === "int" )
        // if already bigint do not cast into jsint (loss of precision).
        suffix = "n";

    // 1e+54 should had be stored as bigint.
    return toJS(r`${value}${suffix}`, cursor);
}