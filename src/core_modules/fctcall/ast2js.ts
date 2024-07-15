import { astnode2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    let js = astnode2js(this.children[0], cursor);
    js += '(';
    cursor.col += 1;

    for(let i = 1; i < this.children.length; ++i) {

        if( i !== 1) {
            js += ",";
            cursor.col += 1;
        }
        
        js += astnode2js(this.children[i], cursor);
    }

    js += ")";

    this.jscode!.end = {
        line: cursor.line,
        col : cursor.col + 1,
    }

    return js;
}