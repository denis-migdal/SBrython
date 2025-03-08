import { BODY } from "@SBrython/core_modules/lists";
import { addChild, setType, type } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, BODY);

    const nbChildren = node.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node[i], context);
}

convert.brython_name = "Body";