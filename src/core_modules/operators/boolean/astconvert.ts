import { OPERATORS_BOOLEAN } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

const bname2jsop = {
    'And': '&&',
    'Or' : '||'
};

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, OPERATORS_BOOLEAN);
    const nbChildren = node.values.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.values[i], context )

    setResultType(dst, resultType(coffset) );
    
    VALUES[dst] = bname2jsop[node.op.constructor.$name as keyof typeof bname2jsop];
}

convert.brython_name = ["BoolOp"];