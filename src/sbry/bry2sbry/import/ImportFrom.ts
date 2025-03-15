import { AST_KEY_IMPORT } from "@SBrython/sbry/ast2js/";
import { addChild, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_KEY_IMPORT);
    const nbChildren = node.names.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i)
        convert_node(i + coffset, node.names[i], context); // not used yet ?

    VALUES[dst] = node.module;
}