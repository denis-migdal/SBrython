import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "number" )
        return;

    const astnode = new ASTNode(node, "literals.int", node.value);
    astnode.result_type = "int"
    return astnode;
}