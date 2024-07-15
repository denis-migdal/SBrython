import { astnode2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    if( this.type === "ifblock")
        return astnode2js(this.children[0], this.jscode!.start);

    //if
    let cursor = {...this.jscode!.start};
    const start_col = cursor.col;

    let js = "if(";
    cursor.col = start_col + js.length;
    js += astnode2js(this.children[0], cursor);
    js += "){";
        cursor.col = start_col + js.length;
        js += astnode2js(this.children[1], cursor) //TODO...
    js += "}";

    return js;
}