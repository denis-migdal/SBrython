import { convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( ! ("test" in node) )
        return false;

    //TODO: check condition type...

    return new ASTNode(node, "ifblock", "ifblock", [
        new ASTNode(node, "ifblock", "if", [ //TODO: pycode ???
            convert_node(node.test),
            ...node.body.map( (m:any) => convert_line(m) )
            ])
        ]);
}