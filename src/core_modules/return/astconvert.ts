import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    const expr = convert_node(node.value, context);

    return new ASTNode(node, "return", expr.result_type, null, [expr]);
}

convert.brython_name = "Return";