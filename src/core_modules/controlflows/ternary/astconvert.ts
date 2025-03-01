import { set_py_code } from "ast2js";
import { CONTROLFLOWS_TERNARY } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const cond       = convert_node(node.test, context);
    const body_true  = convert_node(node.body, context);
    const body_false = convert_node(node.orelse, context);

    const ast = new ASTNode(CONTROLFLOWS_TERNARY, body_true.result_type, [
        cond,
        body_true,
        body_false
    ]);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "IfExp";