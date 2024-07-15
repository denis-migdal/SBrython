import { astnode2js, newline } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    if( this.type === "ifblock")
        return astnode2js(this.children[0], cursor);

    //if
    const start_col = cursor.col;

    let js = "if(";
    cursor.col = start_col + js.length;
    js += astnode2js(this.children[0], cursor);
    js += "){";
        cursor.col += 2;
        for(let i = 1; i < this.children.length; ++i) {
            js += newline(this, cursor, 1);
            js += astnode2js(this.children[i], cursor)
        }
    js += newline(this, cursor);
    js += "}";

    this.jscode!.end = {
        line: cursor.line,
        col: 2,
    }

    return js;
}