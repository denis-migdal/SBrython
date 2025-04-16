import { AST_CALL_ARG_KW } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_CALL_ARG_KW);

    const coffset = addFirstChild(dst);
    convert_node (coffset, node.value, context )
    setResultType(dst, resultType(coffset));

    VALUES[dst] = node.arg;
}