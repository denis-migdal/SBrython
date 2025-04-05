import { AST_CTRL_TERNARY } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, resultType, setResultType, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    let cur = addFirstChild(dst);

    convert_node(cur  , node.test  , context);
    cur = addSibling(cur);
    convert_node(cur, node.body  , context); // true
    setResultType(dst, resultType(cur));
    cur = addSibling(cur);
    convert_node(cur, node.orelse, context); // false

    setType(dst , AST_CTRL_TERNARY);
}