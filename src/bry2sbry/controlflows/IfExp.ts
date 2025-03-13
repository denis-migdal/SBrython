import { CONTROLFLOWS_TERNARY } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    const coffset = addChild(dst, 3);

    convert_node(coffset  , node.test  , context);
    convert_node(coffset+1, node.body  , context); // true
    convert_node(coffset+2, node.orelse, context); // false

    setType(dst , CONTROLFLOWS_TERNARY);
    setResultType(dst, resultType(coffset+1));
}