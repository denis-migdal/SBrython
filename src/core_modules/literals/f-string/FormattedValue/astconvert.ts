import { LITERALS_F_STRING_FORMATTEDVALUE } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, LITERALS_F_STRING_FORMATTEDVALUE);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.value, context);
}

convert.brython_name = "FormattedValue";