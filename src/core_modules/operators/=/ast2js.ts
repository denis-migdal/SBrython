import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    let js = "";
    if( this.type.endsWith("(init)") )
        js += toJS("var ", cursor);

    js += toJS(this.children[0], cursor);
    for(let i = 1; i < this.children.length - 1; ++i)
        js += toJS(r` = ${this.children[i]}`, cursor);

    let right_node: any = this.children[this.children.length-1];

    if( right_node.result_type === "jsint" && this.result_type === "int" )
        right_node = Number2Int(right_node);

    js += toJS(r` = ${right_node}`, cursor);

    return js;
}