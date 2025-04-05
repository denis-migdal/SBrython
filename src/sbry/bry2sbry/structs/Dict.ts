import { AST_STRUCT_DICT } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {
    
    setType(dst, AST_STRUCT_DICT);

    const keys   = node.keys;
    const values = node.values;

    const nbChildren = keys.length;
    if( nbChildren === 0 )
        return;

    let cur = addFirstChild(dst);
    convert_node(cur,   keys[0], context);
    cur = addSibling(cur);
    convert_node(cur, values[0], context);

    for(let i = 1; i < node.keys.length; ++i) {
        cur = addSibling(cur);
        convert_node(cur,   keys[i], context);
        cur = addSibling(cur);
        convert_node(cur, values[i], context);
    }
}