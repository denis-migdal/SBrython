import { KEYWORDS_ASSERT } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_ASSERT);
    const coffset = addChild(dst, 1);
    convert_node(coffset, node.test, context);
}

convert.brython_name = "Assert";