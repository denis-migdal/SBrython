import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( typeof node.value !== "boolean" )
        return false;

    const astnode = new ASTNode(node, "literal.bool", node.value);
    astnode.result_type = "bool";
    return astnode;
}