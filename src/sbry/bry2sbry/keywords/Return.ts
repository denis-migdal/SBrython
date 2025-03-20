import { AST_KEY_RETURN } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_NoneType } from "@SBrython/sbry/types";

import Types from "@SBrython/sbry/types/list";
import { Callable, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst:number, node: any, context: Context) {

    // context.parent_node_context
    let result_type = TYPEID_NoneType;
    
    if(node.value !== undefined) {
        const coffset = addChild(dst, 1);
        convert_node(coffset, node.value, context);
        result_type = resultType(coffset);
    }

    setType(dst, AST_KEY_RETURN);
    setResultType(dst, result_type);

    const meta = (Types[resultType(context.parentTypeID!)] as Callable).__call__;
    if( meta[RETURN_TYPE] === undefined )
        meta[RETURN_TYPE] = () => result_type;
}