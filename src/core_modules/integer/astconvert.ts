import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( typeof node.value !== "number" )
        return false;

    return new ASTNode(node, "integer", node.value);
}