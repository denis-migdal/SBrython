import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let value = this.value;

    if( (this as any).asFloat && (! (this as any).asFloatIsOpt) && typeof value === "bigint")
        value = Number(value);

    if( (this as any).asFloat && typeof value === "number") // opti
        return toJS(r`${this.value}`, cursor);        

    return toJS(r`${this.value}n`, cursor);
}