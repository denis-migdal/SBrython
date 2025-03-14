import { RETURN } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { TYPEID_NoneType } from "@SBrython/types";

import Types from "@SBrython/types/list";
import { Callable, RETURN_TYPE } from "@SBrython/types/utils/types";

export default function convert(dst:number, node: any, context: Context) {

    // context.parent_node_context
    let result_type = TYPEID_NoneType;
    
    if(node.value !== undefined) {
        const coffset = addChild(dst, 1);
        convert_node(coffset, node.value, context);
        result_type = resultType(coffset);
    }

    setType(dst, RETURN);
    setResultType(dst, result_type);

    const meta = (Types[resultType(context.parent_node_context!)] as Callable).__call__;
    if( meta[RETURN_TYPE] === undefined )
        meta[RETURN_TYPE] = () => result_type;
}