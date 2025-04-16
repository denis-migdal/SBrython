import { AST_LIT_FSTRING_FVAL } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_LIT_FSTRING_FVAL);
    const coffset = addFirstChild(dst);

    convert_node(coffset, node.value, context);
}