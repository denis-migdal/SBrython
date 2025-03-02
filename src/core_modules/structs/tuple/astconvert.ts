import { STRUCTS_TUPLE } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, STRUCTS_TUPLE);
    const nbChildren = node.elts.length;
    const coffset = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.elts[i], context);

}

convert.brython_name = "Tuple";