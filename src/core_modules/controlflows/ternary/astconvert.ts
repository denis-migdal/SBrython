import { CONTROLFLOWS_TERNARY } from "core_modules/lists";
import { addChild, resultType, setResultType, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    const coffset = addChild(dst, 3);

    convert_node(coffset  , node.test  , context);
    convert_node(coffset+1, node.body  , context); // true
    convert_node(coffset+2, node.orelse, context); // false

    setType(dst , CONTROLFLOWS_TERNARY);
    setResultType(dst, resultType(coffset+1));
}

convert.brython_name = "IfExp";