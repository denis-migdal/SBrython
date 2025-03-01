import { set_py_code } from "ast2js";
import { CONTROLFLOWS_WHILE } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const ast = new ASTNode(CONTROLFLOWS_WHILE, 0, [
        convert_node(node.test, context),
        convert_node(node.body, context)
    ]);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "While";