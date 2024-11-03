import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct } from "structs/SType";
import { SType_NoneType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    // context.parent_node_context
    let result_type = SType_NoneType;
    let children    = undefined;
    
    if(node.value !== undefined) {
        const expr = convert_node(node.value, context);
        result_type = expr.result_type!;
        children    = [expr];
    }

    const meta = (context.parent_node_context!.result_type! as STypeFct ).__call__;
    if( meta.return_type === undefined )
        meta.return_type = () => result_type;
    
    return new ASTNode(node, "keywords.return", result_type, null, children);
}

convert.brython_name = "Return";