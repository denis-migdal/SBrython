import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.type === "controlflows.for(range)") {

        let beg : string|ASTNode  = "0n";
        let incr: string|ASTNode = "1n";
        let end  = this.children[0];

        if( this.children.length > 2) {
            beg = this.children[0];
            end = this.children[1];
        }
        if( this.children.length > 3)
            incr = this.children[2];

        let js = toJS(r`for(var ${this.value} = ${beg}; ${this.value} < ${end}; ${this.value} += ${incr})`, cursor);
        js += body2js(this, cursor, this.children.length-1);

        return js;
    }

    let js = toJS(r`for(var ${this.value} of this.children[0])`, cursor);
        js += body2js(this, cursor, 1);
    
    return js;
}