import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( typeof node.value !== "number" )
        return false;

    const astnode = new ASTNode(node, "literal.int", node.value);
    astnode.result_type = "int"
    return astnode;
}