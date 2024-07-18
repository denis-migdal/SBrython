import { astnode2js, body2js, newline } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    if( this.type === "controlflows.ifblock")
        return astnode2js(this.children[0], cursor);

    //if
    let js = "if(";
    cursor.col += js.length;
    js += astnode2js(this.children[0], cursor);
    js += ")";
    js += body2js(this, cursor, 1);

    this.jscode!.end = {...cursor};

    return js;
}