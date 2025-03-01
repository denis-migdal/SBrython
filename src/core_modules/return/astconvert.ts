import { set_py_code } from "ast2js";
import { RETURN } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct } from "structs/SType";
import { STYPE_NONETYPE, STypes } from "structs/STypes";

export default function convert(node: any, context: Context) {

    // context.parent_node_context
    let result_type = STYPE_NONETYPE;
    let children    = undefined;
    
    if(node.value !== undefined) {
        const expr = convert_node(node.value, context);
        result_type = expr.result_type!;
        children    = [expr];
    }

    const meta = (STypes[context.parent_node_context!.result_type] as STypeFct).__call__;
    if( meta.return_type === undefined )
        meta.return_type = () => result_type;
    
    const ast = new ASTNode(RETURN, result_type, children);
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Return";