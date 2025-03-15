import { AST_OP_BRACKETS } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_OP_BRACKETS);
    const coffset = addChild(dst, 2);

    convert_node(coffset,   node.value, context),
    convert_node(coffset+1, node.slice, context)
}