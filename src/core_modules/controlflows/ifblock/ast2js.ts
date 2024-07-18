import { astnode2js, body2js, newline } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    if( this.type === "controlflows.ifblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)
            js += astnode2js(this.children[i], cursor);
        return js;
    }

    //if
    let keyword = "if";
    if( this.type === "controlflows.elif")
        keyword = "else if";
    if( this.type === "controlflows.else")
        keyword = "else";

    let js = `${keyword}`;
    let offset = 0;
    if( keyword !== "else") {
        js += "(";
        cursor.col += js.length;
        js += astnode2js(this.children[0], cursor);
        ++offset;
        js += ")";
    }
    if(keyword !== "if") {  // h4ck
        --this.jscode!.start.col;
    }
    js += body2js(this, cursor, offset);
    if(keyword !== "if") {  // h4ck
        ++this.jscode!.start.col;
    }

    this.jscode!.end = {...cursor};

    return js;
}