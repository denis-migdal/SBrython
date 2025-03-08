import { CONTROLFLOWS_WHILE } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_body, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, CONTROLFLOWS_WHILE);
    const coffset = addChild(dst, 2);

    convert_node(coffset  , node.test, context);
    convert_body(coffset+1, node.body, context);

}

convert.brython_name = "While";