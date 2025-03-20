import { AST_OP_ATTR } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID } from "@SBrython/sbry/types/utils/types";
import Types from "@SBrython/sbry/types";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, AST_OP_ATTR);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.value, context);

    const type_obj = resultType(coffset);
    // @ts-ignore
    setResultType(dst, Types[type_obj][node.attr]?.[TYPEID] ?? 0);

    //TODO: return type...
    let value = node.attr;
    if( value === "__class__")
        value = "constructor";

    VALUES[dst] = value;
}