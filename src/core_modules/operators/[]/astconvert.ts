import { OPERATORS__BRACKETS } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, OPERATORS__BRACKETS);
    const coffset = addChild(dst, 2);

    convert_node(coffset,   node.value, context),
    convert_node(coffset+1, node.slice, context)
}

convert.brython_name = ["Subscript"];