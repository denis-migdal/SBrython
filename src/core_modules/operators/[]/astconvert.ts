import { set_py_code } from "ast2js";
import { OPERATORS__BRACKETS } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const ast = new ASTNode(OPERATORS__BRACKETS, 0,
        [
            convert_node(node.value, context),
            convert_node(node.slice, context)
        ]
    );
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["Subscript"];