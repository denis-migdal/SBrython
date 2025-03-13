import { STRUCTS_LIST } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, STRUCTS_LIST);
    const nbChildren = node.elts.length;
    const coffset = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.elts[i], context);
}