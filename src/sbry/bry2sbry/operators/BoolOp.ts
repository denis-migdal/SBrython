import { AST_OP_BOOL } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

const bname2jsop = {
    'And': '&&',
    'Or' : '||'
};

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_OP_BOOL);
    const nbChildren = node.values.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.values[i], context )

    setResultType(dst, resultType(coffset) );
    
    VALUES[dst] = bname2jsop[node.op.constructor.$name as keyof typeof bname2jsop];
}