// @ts-nocheck

import { AST_OP_ASSIGN_AUG } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];
    if( __SBRY_MODE__ === "dev" && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    VALUES[dst] = op;

    setType(dst, AST_OP_ASSIGN_AUG);
    const coffset = addFirstChild(dst);

    convert_node(coffset            , node.target, context);
    convert_node(addSibling(coffset), node.value,  context);

    setResultType(dst, resultType(coffset));
}