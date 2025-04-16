import { AST_KEY_ASSERT } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_KEY_ASSERT);
    const coffset = addFirstChild(dst);
    convert_node(coffset, node.test, context);
}