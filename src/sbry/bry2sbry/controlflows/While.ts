import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_WHILE } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_CTRL_WHILE);
    const coffset = addFirstChild(dst);

    convert_node(coffset  , node.test, context);

    const body = addSibling(coffset);
    Body(body, node.body, context);
    if(__SBRY_MODE__ === "dev") set_py_code_from_list(body, node.body);

}