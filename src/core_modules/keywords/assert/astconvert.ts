import { set_py_code } from "ast2js";
import { KEYWORDS_ASSERT } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const ast = new ASTNode(KEYWORDS_ASSERT, 0, [
        convert_node(node.test, context)
    ]);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Assert";