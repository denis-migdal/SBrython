import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("id" in node) )
        return;

    let result_type = null;
    if( node.id in context.local_variables)
        result_type = context.local_variables[node.id];

   return new ASTNode(node, "symbol", result_type, node.id);
}