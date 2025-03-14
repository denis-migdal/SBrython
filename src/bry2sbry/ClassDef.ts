import Body from "@SBrython/bry2sbry/Body";
import { CLASS_CLASSDEF } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/py2ast";
import { addType } from "@SBrython/types/utils/addType";

export default function convert(dst: number, node: any, context: Context) {

    context.local_symbols[node.name] = addType(node.name, {});
    context = new Context("class", context);

    if( __DEBUG__ && node.bases.length > 1)
        throw new Error('Not implemented');

    setType(dst , CLASS_CLASSDEF);
    const nbChildren = 1 + node.bases.length;
    const coffset    = addChild(dst, nbChildren);

    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    for(let i = 1; i < nbChildren ; ++i)
        convert_node(i+coffset, node.bases[i-1], context);

    VALUES[dst] = node.name;
}