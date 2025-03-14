import { OPERATORS_COMPARE } from "@SBrython/core_modules/lists";
import { addChild, setResultType, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { bname2pyname } from "@SBrython/structs/BinaryOperators";
import { TYPEID_bool } from "@SBrython/types";

export default function convert(dst: number, node: any, context: Context) {

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

    setType(dst, OPERATORS_COMPARE);
    setResultType(dst, TYPEID_bool);
    const nbChildren = node.comparators.length + 1;
    const coffset = addChild(dst, nbChildren);

    convert_node(coffset, node.left, context );
    for(let i = 1 ; i < nbChildren; ++i)
        convert_node(i + coffset, node.comparators[i-1], context);
}
