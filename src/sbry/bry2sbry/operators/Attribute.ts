import { AST_OP_ATTR } from "@SBrython/sbry/ast2js/";
import { addChild, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, AST_OP_ATTR);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.value, context);

    VALUES[dst] = node.attr;
}