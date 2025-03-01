import { set_py_code } from "ast2js";
import { OPERATORS_ATTR } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    const ast = new ASTNode(OPERATORS_ATTR, 0,
        [
            convert_node(node.value, context)
        ]
    );

    VALUES[ast.id] = node.attr;
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["Attribute"];