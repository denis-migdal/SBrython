import { set_py_code } from "ast2js";
import { STRUCTS_TUPLE } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    const ast = new ASTNode(STRUCTS_TUPLE, 0, 
        node.elts.map( (n: any) => convert_node(n, context) )
    );
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Tuple";