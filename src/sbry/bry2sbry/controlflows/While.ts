import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_WHILE } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_CTRL_WHILE);
    const coffset = addChild(dst, 2);

    convert_node(coffset  , node.test, context);

    Body(coffset+1, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset+1, node.body);

}