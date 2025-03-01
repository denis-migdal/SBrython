import { set_py_code } from "ast2js";
import { STRUCTS_DICT } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    let children = new Array(node.keys.length * 2);
    for(let i = 0; i < node.keys.length; ++i) {
        children[2*i]   = convert_node(node.  keys[i], context);
        children[2*i+1] = convert_node(node.values[i], context);
    }

    const ast = new ASTNode(STRUCTS_DICT, 0, children );
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Dict";