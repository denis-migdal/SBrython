import { AST_OP_BRACKETS } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_OP_BRACKETS);
    const coffset = addChild(dst, 2);

    convert_node(coffset,   node.value, context),
    convert_node(coffset+1, node.slice, context)
}