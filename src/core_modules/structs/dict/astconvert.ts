import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    let children = new Array(node.keys.length * 2);
    for(let i = 0; i < node.keys.length; ++i) {
        children[2*i]   = convert_node(node.  keys[i], context);
        children[2*i+1] = convert_node(node.values[i], context);
    }

    return new ASTNode(node, "structs.dict", null, null, 
        children
    );
}

convert.brython_name = "Dict";