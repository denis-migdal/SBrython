import { AST_STRUCT_LIST } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_STRUCT_LIST);
    const nbChildren = node.elts.length;
    const coffset = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.elts[i], context);
}