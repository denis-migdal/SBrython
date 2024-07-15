import { astnode2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {
    
    let cursor = {...this.jscode!.start};

    //TODO None type...

    let js = astnode2js(this.children[0], cursor);
    js += "===";
    cursor.col += 3;
    js += astnode2js(this.children[1], cursor);

    this.jscode!.end = {...cursor};

    return js;
}