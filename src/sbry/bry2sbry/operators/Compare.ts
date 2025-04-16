// @ts-nocheck

import { AST_OP_CMP } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_bool } from "@SBrython/sbry/types/list";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    const nops = node.ops;
    const nb_ops = nops.length
    const ops = new Array(nb_ops);
    for(let i = 0; i < nb_ops; ++i) {

        const op = bname2pyname[nops[i].constructor.$name as keyof typeof bname2pyname];
        if( __DEBUG__ && op === undefined)
            throw new Error(`${nops[i].constructor.$name} not implemented!`);
        
        ops[i] = op;
    }

    VALUES[dst] = ops;

    setType(dst, AST_OP_CMP);
    setResultType(dst, TYPEID_bool);

    let cur = addFirstChild(dst);
    convert_node(cur, node.left, context );

    const nbChildren = node.comparators.length;
    for(let i = 0 ; i < nbChildren; ++i) {
        cur = addSibling(cur);
        convert_node(cur, node.comparators[i], context);
    }
}
