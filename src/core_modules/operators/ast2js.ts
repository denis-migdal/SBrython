import { astnode2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};
    const start_col = cursor.col;

    //TODO: check children type...
    //TODO: priority checks
    let js = "";
    
    cursor.col = start_col + js.length;
    js += astnode2js(this.children[0], cursor);

    js += "+";

    cursor.col = start_col + js.length;
    js += astnode2js(this.children[1], cursor);

    js += "";

    /*
    let js = "op(";

    cursor.col = start_col + js.length;
    js += astnode2js(this.children[0], cursor);

    js += ", '+', ";

    cursor.col = start_col + js.length;
    js += astnode2js(this.children[1], cursor);

    js += ")";*/

    /*let js = `${this.value}(`;
    for(let i = 0; i < this.children.length; ++i) {
        if( i !== 0)
            js += ",";
        cursor.col = start_col + js.length;
        js += astnode2js(this.children[i], cursor);
    }
    js += ")";*/

    return js;
}