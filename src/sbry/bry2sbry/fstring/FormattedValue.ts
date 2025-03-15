import { AST_LIT_FSTRING_FVAL } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_LIT_FSTRING_FVAL);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.value, context);
}