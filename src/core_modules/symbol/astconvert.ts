import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("id" in node) )
        return;

    const astnode = new ASTNode(node, "symbol", node.id);

    if( node.id in context.local_variables)
        astnode.result_type = context.local_variables[node.id];

    return astnode;
}