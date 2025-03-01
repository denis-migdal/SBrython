import { set_py_code } from "ast2js";
import { FUNCTIONS_CALL_KEYWORD } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const value    = convert_node(node.value, context )
    const ret_type = value.result_type;

    const ast = new ASTNode(FUNCTIONS_CALL_KEYWORD, ret_type, [
        value
    ]);

    VALUES[ast.id] = node.arg;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "keyword";