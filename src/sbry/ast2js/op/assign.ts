import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types";

export default function ast2js(node: NODE_ID) {
    
    let rchild = firstChild(node);
    
    let cur = nextSibling(rchild);
    do {

        w_node(cur);
        w_str(" = ");

        cur = nextSibling(cur);
    } while(cur !== 0);

    if( resultType(rchild) === TYPEID_jsint && resultType(node) === TYPEID_int )
        rchild = Number2Int(rchild);

    w_node(rchild);
}