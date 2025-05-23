import { AST_KEY_RETURN } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, NODE_ID, resultType, setResultType, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import TYPES, { TYPEID_NoneType } from "@SBrython/sbry/types/list";

import { Callable, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    // context.parent_node_context
    let result_type = TYPEID_NoneType;
    
    if(node.value !== undefined) {
        const coffset = addFirstChild(dst);
        convert_node(coffset, node.value, context);
        result_type = resultType(coffset);
    }

    setType(dst, AST_KEY_RETURN);
    setResultType(dst, result_type);

    const meta = (TYPES[context.parentTypeID!] as Callable).__call__;
    if( meta[RETURN_TYPE] === undefined )
        meta[RETURN_TYPE] = () => result_type;
}