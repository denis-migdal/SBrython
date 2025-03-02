import { KEYWORDS_RAISE } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_RAISE);
    const coffset = addChild(dst, 1);
    convert_node(coffset, node.exc, context);

}

convert.brython_name = "Raise";