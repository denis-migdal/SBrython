import { AST_OP_BRACKETS } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_OP_BRACKETS);
    const first = addFirstChild(dst);

    convert_node(first            , node.value, context),
    convert_node(addSibling(first), node.slice, context)
}