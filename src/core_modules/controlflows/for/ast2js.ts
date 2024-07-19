import { astnode2js, body2js, newline } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    if( this.type === "controlflows.for(range)") {

        let js = `for(let ${this.value}=`;
        cursor.col += js.length;
        
        if( this.children.length >= 3)
            js += astnode2js(this.children[0], cursor);
        else {
            js += `0n`;
            cursor.col += 2;
        }

        js += `; ${this.value} < `;
        cursor.col += this.value.length + 5;

        let end_idx = 0;
        if(this.children.length > 2)
            end_idx = 1;

        js+= astnode2js(this.children[end_idx], cursor);

        if( this.children.length < 4) {
            js+= `; ++${this.value})`;
            cursor.col += this.value.length + 5;
        } else {
            js+= `; ${this.value}+=`;
            cursor.col += this.value.length + 4;
            js+= astnode2js(this.children[2], cursor);
            js+= ")"
            ++cursor.col;
        }

        js += body2js(this, cursor, this.children.length-1);
        
        this.jscode!.end = {...cursor};

        return js;
    }

    let js = `for(let ${this.value} of `;
    cursor.col += js.length;
    js += astnode2js(this.children[0], cursor);
    js += ')';
    ++cursor.col;
    js += body2js(this, cursor, 1);
    
    this.jscode!.end = {...cursor};

    return js;
}