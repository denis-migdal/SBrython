import { OPERATORS_COMPARE } from "@SBrython/core_modules/lists";
import { addChild, setResultType, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { bname2pyname } from "@SBrython/structs/BinaryOperators";
import { STYPE_BOOL } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, context: Context) {

    const ops = node.ops.map( (e: any) => {
        const op = bname2pyname[e.constructor.$name as keyof typeof bname2pyname];
        if( __DEBUG__ && op === undefined)
            throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });
    VALUES[dst] = ops;

    setType(dst, OPERATORS_COMPARE);
    setResultType(dst, STYPE_BOOL);
    const nbChildren = node.comparators.length + 1;
    const coffset = addChild(dst, nbChildren);

    convert_node(coffset, node.left, context );
    for(let i = 1 ; i < nbChildren; ++i)
        convert_node(i + coffset, node.comparators[i-1], context);
}

convert.brython_name = "Compare";