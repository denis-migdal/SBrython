import { FUNCTIONS_CALL_KEYWORD } from "core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, FUNCTIONS_CALL_KEYWORD);

    const coffset = addChild(dst, 1);
    convert_node (coffset, node.value, context )
    setResultType(dst, resultType(coffset));

    VALUES[dst] = node.arg;
}

convert.brython_name = "keyword";