import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    console.log("try", {...cursor});
    
    let js = toJS("try", cursor);
        js+= body2js(this, cursor);

    console.log("try", {...cursor});

    return js;
}