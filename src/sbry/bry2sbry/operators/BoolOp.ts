import { AST_OP_BOOL } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

const bname2jsop = {
    'And': '&&',
    'Or' : '||'
};

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_OP_BOOL);
    const nbChildren = node.values.length;

    let cur    = addFirstChild(dst);
    convert_node(cur, node.values[0], context )
    setResultType(dst, resultType(cur) );

    for(let i = 1; i < nbChildren; ++i) {
        cur = addSibling(cur);
        convert_node(cur, node.values[i], context )
    }
    
    VALUES[dst] = bname2jsop[node.op.constructor.$name as keyof typeof bname2jsop];
}