import { AST_KEY_RAISE } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_KEY_RAISE);
    const coffset = addChild(dst, 1);
    convert_node(coffset, node.exc, context);

}