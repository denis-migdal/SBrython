import { AST_FCT_CALL_KEYWORD } from "@SBrython/sbry/ast2js/";
import { addFirstChild, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_FCT_CALL_KEYWORD);

    const coffset = addFirstChild(dst);
    convert_node (coffset, node.value, context )
    setResultType(dst, resultType(coffset));

    VALUES[dst] = node.arg;
}