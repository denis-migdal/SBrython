import { set_py_code } from "ast2js";
import { KEYWORDS_IMPORT } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const ast = new ASTNode(KEYWORDS_IMPORT, 0,
        node.names.map( (n:any) => convert_node(n, context) )
    );

    VALUES[ast.id = node.module];

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["Import", "ImportFrom"];