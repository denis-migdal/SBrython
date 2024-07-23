import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    return new ASTNode(node, "structs.list", null, null, 
        node.elts.map( (n: any) => convert_node(n, context) )
    );
}

convert.brython_name = "List";