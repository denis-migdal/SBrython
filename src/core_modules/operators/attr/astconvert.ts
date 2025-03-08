import { OPERATORS_ATTR } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, OPERATORS_ATTR);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.value, context);

    VALUES[dst] = node.attr;
}

convert.brython_name = ["Attribute"];