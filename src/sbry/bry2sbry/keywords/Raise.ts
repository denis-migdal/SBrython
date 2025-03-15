import { AST_KEY_RAISE } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_KEY_RAISE);
    const coffset = addChild(dst, 1);
    convert_node(coffset, node.exc, context);

}