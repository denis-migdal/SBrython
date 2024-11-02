import { NL, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";

export default function ast2js(this: ASTNode) {

    const idx  = this.value;
    const body = this.children[this.children.length-1];

    if( this.type === "controlflows.for(range)") {

        let beg : string|ASTNode|any  = "0n";
        let incr: string|ASTNode|any = "1n";
        let end  = Number2Int(this.children[0]);

        if( this.children.length > 2) {
            beg = Number2Int(this.children[0]);
            end = Number2Int(this.children[1]);
        }
        if( this.children.length > 3)
            incr = Number2Int(this.children[2]);

        return wt`for(var ${idx} = ${beg}; ${idx} < ${end}; ${idx} += ${incr}){${body}${NL}}`;
    }

    const list = this.children[0];

    wt`for(var ${idx} of ${list}){${body}${NL}}`;
}