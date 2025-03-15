import { AST_STRUCT_DICT } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, AST_STRUCT_DICT);
    const coffset = addChild(dst, node.keys.length * 2);

    for(let i = 0; i < node.keys.length; ++i) {
        convert_node(2*i+coffset, node.  keys[i], context);
        convert_node(2*i+1+coffset, node.values[i], context);
    }
}