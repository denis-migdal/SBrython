import { set_py_code } from "ast2js";
import { CONTROLFLOWS_FOR } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range")
        return;

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO

    const ast = new ASTNode(CONTROLFLOWS_FOR, 0, [
        convert_node(node.iter, context),
        convert_node(node.body, context)
    ]);

    VALUES[ast.id] = target;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "For";