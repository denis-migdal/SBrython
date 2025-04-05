import { AST_LIT_FSTRING } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, setResultType, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_str } from "@SBrython/sbry/types";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_LIT_FSTRING);
    setResultType(dst, TYPEID_str);

    const values = node.values;
    const nbChildren = values.length;

    if( nbChildren === 0)
        return;

    let cur    = addFirstChild(dst);
    convert_node(cur, values[0], context);

    for(let i = 1; i < nbChildren; ++i) {
        cur = addSibling(cur);
        console.warn( values[i].constructor.$name); //TODO: not used yet.
        convert_node(cur, values[i], context);
    }
}