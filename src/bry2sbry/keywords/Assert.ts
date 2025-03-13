import { KEYWORDS_ASSERT } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_ASSERT);
    const coffset = addChild(dst, 1);
    convert_node(coffset, node.test, context);
}