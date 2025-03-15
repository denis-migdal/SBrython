import { AST_LIT_FSTRING } from "@SBrython/sbry/ast2js/";
import { addChild, setResultType, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";
import { TYPEID_str } from "@SBrython/sbry/types";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_LIT_FSTRING);
    setResultType(dst, TYPEID_str);

    const nbChildren = node.values.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i) {
        console.warn( node.values[i].constructor.$name); //TODO: not used yet.
        convert_node(i + coffset, node.values[i], context);
    }
}