import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CLASSDEF } from "@SBrython/sbry/ast2js/";
import { addChild, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/py2ast";
import { addType } from "@SBrython/sbry/types/utils/addType";

export default function convert(dst: number, node: any, context: Context) {

    context.local_symbols[node.name] = addType(node.name, {});
    context = new Context("class", context);

    if( __DEBUG__ && node.bases.length > 1)
        throw new Error('Not implemented');

    setType(dst , AST_CLASSDEF);
    const nbChildren = 1 + node.bases.length;
    const coffset    = addChild(dst, nbChildren);

    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    for(let i = 1; i < nbChildren ; ++i)
        convert_node(i+coffset, node.bases[i-1], context);

    VALUES[dst] = node.name;
}