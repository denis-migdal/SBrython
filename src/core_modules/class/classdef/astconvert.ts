import { CLASS_CLASSDEF } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_body, convert_node } from "@SBrython/py2ast";
import { getSTypeID } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, context: Context) {

    context.local_symbols[node.name] = getSTypeID(node.name);
    context = new Context("class", context);

    if( node.bases.length > 1)
        throw new Error('Not implemented');

    setType(dst , CLASS_CLASSDEF);
    const nbChildren = 1 + node.bases.length;
    const coffset    = addChild(dst, nbChildren);

    convert_body(coffset, node.body, context);
    for(let i = 1; i < nbChildren ; ++i)
        convert_node(i+coffset, node.bases[i-1], context);

    VALUES[dst] = node.name;
}

convert.brython_name = "ClassDef";