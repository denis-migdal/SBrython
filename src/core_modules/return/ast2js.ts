import { astnode2js } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    let cursor = {...this.jscode!.start};

    let js = `return `;
    cursor.col += 7;

    js += astnode2js(this.children[0], cursor);


    this.jscode!.end = {...cursor};

    return js;
}