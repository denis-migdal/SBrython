import { w_NL, w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType, type } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types/list";
import { AST_OP_ASSIGN_INIT } from "../list";

export default function ast2js(node: NODE_ID) {
    let rchild    = firstChild(node);
    let lchild    = nextSibling(rchild);

    if( type(rchild) === AST_OP_ASSIGN_INIT) {
        w_node(rchild);
        w_NL();
        rchild = nextSibling(firstChild(rchild));
    } else if( resultType(rchild) === TYPEID_jsint && resultType(node) === TYPEID_int )
        rchild = Number2Int(rchild);

    w_sns("", lchild, " = ", rchild, "");
}