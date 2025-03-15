import { AST_CTRL_TERNARY } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    const coffset = addChild(dst, 3);

    convert_node(coffset  , node.test  , context);
    convert_node(coffset+1, node.body  , context); // true
    convert_node(coffset+2, node.orelse, context); // false

    setType(dst , AST_CTRL_TERNARY);
    setResultType(dst, resultType(coffset+1));
}