import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { Number2Int } from "structs/BinaryOperators";
import { SType_int, SType_jsint } from "structs/STypes";

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    let js = "";
    if( this.type.endsWith("(init)") )
        js += toJS("var ", cursor);

    js += toJS(this.children[0], cursor);
    for(let i = 1; i < this.children.length - 1; ++i)
        js += toJS(r` = ${this.children[i]}`, cursor);

    const right_node = this.children[this.children.length-1];
    let rchild: any = right_node;

    if( right_node.result_type === SType_jsint && this.result_type === SType_int )
        rchild = Number2Int(right_node);

    js += toJS(r` = ${rchild}`, cursor);

    return js;
}