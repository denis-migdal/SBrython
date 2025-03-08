import { KEYWORDS_IMPORT } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_IMPORT);
    const nbChildren = node.names.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.names[i], context);

    VALUES[dst] = node.module;
}

convert.brython_name = ["Import", "ImportFrom"];