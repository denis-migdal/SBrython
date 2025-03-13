import Body from "@SBrython/bry2sbry/Body";
import { CONTROLFLOWS_WHILE } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, CONTROLFLOWS_WHILE);
    const coffset = addChild(dst, 2);

    convert_node(coffset  , node.test, context);

    Body(coffset+1, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset+1, node.body);

}