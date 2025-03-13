import { STRUCTS_DICT } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, STRUCTS_DICT);
    const coffset = addChild(dst, node.keys.length * 2);

    for(let i = 0; i < node.keys.length; ++i) {
        convert_node(2*i+coffset, node.  keys[i], context);
        convert_node(2*i+1+coffset, node.values[i], context);
    }
}