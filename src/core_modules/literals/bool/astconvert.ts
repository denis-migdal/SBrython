import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "boolean" )
        return false;

    const astnode = new ASTNode(node, "literals.bool", node.value);
    astnode.result_type = "bool";
    return astnode;
}