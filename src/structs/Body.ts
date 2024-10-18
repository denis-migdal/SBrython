import { astnode2js, newline, toJS } from "ast2js";
import { ASTNode, CodePos } from "./ASTNode";


export class Body {

    node;
    print_bracket;
    idx;

    constructor(node: ASTNode, print_bracket = true) {
        this.idx = node.children.length-1; //TODO search body...
        this.node = node;
        this.print_bracket = print_bracket;
    }

    toJS(cursor: CodePos) {

        const start = {...cursor};

        let js = "";
        if(this.print_bracket)
            js+="{";
        const body = this.node.children[this.idx];//body: ASTNode[];
    
        for(let i = 0; i < body.children.length; ++i) {
            js += newline(this.node, cursor, 1);
            js += astnode2js(body.children[i], cursor)
            js += toJS(";", cursor)
        }
    
        if(this.print_bracket) {
            js += newline(this.node, cursor);
            js += "}";
            cursor.col += 1;
        }
    
        body.jscode = {
            start: start,
            end  : {...cursor}
        }
    
        return js;
    }
}