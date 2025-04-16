import { AST_STRUCT_TUPLE } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {
    
    setType(dst, AST_STRUCT_TUPLE);
    const elts       = node.elts;
    const nbChildren = elts.length;
    
    if( nbChildren === 0)
        return;
    
    let cur = addFirstChild(dst);
    convert_node( cur , elts[0], context);
    for(let i = 1; i < nbChildren; ++i) {
        cur = addSibling(cur);
        convert_node( cur , elts[i], context);
    }

}