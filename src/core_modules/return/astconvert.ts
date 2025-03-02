import { RETURN } from "core_modules/lists";
import { addChild, resultType, setResultType, setType } from "dop";
import { Context, convert_node } from "py2ast";
import { STypeFct } from "structs/SType";
import { STYPE_NONETYPE, STypes } from "structs/STypes";

export default function convert(dst:number, node: any, context: Context) {

    // context.parent_node_context
    let result_type = STYPE_NONETYPE;
    
    if(node.value !== undefined) {
        const coffset = addChild(dst, 1);
        convert_node(coffset, node.value, context);
        result_type = resultType(coffset);
    }

    setType(dst, RETURN);
    setResultType(dst, result_type);

    const meta = (STypes[resultType(context.parent_node_context!)] as STypeFct).__call__;
    if( meta.return_type === undefined )
        meta.return_type = () => result_type;
}

convert.brython_name = "Return";