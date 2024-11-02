import { wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { SType_int } from "structs/STypes";

export default function ast2js(this: ASTNode) {

    let suffix = "";
    let target = (this as any).as;

    let value = this.value;

    if(target === "float") {
        if( this.result_type === SType_int )
            value = Number(value); // remove useless precision.
    }
    else if( target === "int" || this.result_type === SType_int )
        // if already bigint do not cast into jsint (loss of precision).
        suffix = "n";

    // 1e+54 should had be stored as bigint.
    wt`${value}${suffix}`;
}