import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    return new ASTNode(node, "operators.attr", null, node.attr,
        [
            convert_node(node.value, context)
        ]
    );
}

convert.brython_name = ["Attribute"];