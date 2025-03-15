import { AST_FCT_CALL_KEYWORD } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_FCT_CALL_KEYWORD);

    const coffset = addChild(dst, 1);
    convert_node (coffset, node.value, context )
    setResultType(dst, resultType(coffset));

    VALUES[dst] = node.arg;
}