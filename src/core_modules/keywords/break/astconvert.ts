import { set_py_code } from "ast2js";
import { KEYWORDS_BREAK } from "core_modules/lists";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    const ast = new ASTNode(KEYWORDS_BREAK, 0);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Break";