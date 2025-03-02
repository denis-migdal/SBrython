import { LITERALS_F_STRING } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, LITERALS_F_STRING);

    const nbChildren = node.values.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.values[i], context);
}

convert.brython_name = "JoinedStr";