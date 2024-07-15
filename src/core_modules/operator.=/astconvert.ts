import { convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any) {

    if( ! ("targets" in node) )
        return false;

    const left  = convert_node(node.targets[0] );
    const right = convert_node(node.value);

    const astnode = new ASTNode(node, "Operator.=", null,
        [
            left,
            right,
        ]
    );
    
    astnode.result_type = right.result_type;
    return astnode;
}