import { AST_KEY_IMPORT } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_KEY_IMPORT);
    const nbChildren = node.names.length;

    let cur    = addFirstChild(dst);
    convert_node(cur, node.names[0], context);

    for(let i = 1; i < nbChildren; ++i) {
        cur = addSibling(cur);
        convert_node(cur, node.names[i], context); // not used yet ?
    }

    VALUES[dst] = node.module;
}