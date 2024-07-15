import { convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

//TODO: better system...
let is_if = false;

export default function convert(node: any) {

    if( ! ("test" in node) )
        return false;

    if( is_if ) {
        is_if = false;
        return new ASTNode(node, "if", null, [
            convert_node(node.test),
            ...node.body.map( (m:any) => convert_line(m) )
        ]);
    }

    is_if = true;

    return new ASTNode(node, "ifblock", null, [
            convert_node(node)
        ]);
}