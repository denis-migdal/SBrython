import { set_py_code } from "ast2js";
import { CONTROLFLOWS_TRYBLOCK } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const children = new Array<ASTNode>(node.handlers.length+1);

    // try body
    children[0] = convert_node(node.body, context);

    for(let i = 0; i < node.handlers; ++i)
        children[i+1] = convert_node(node.handlers[i], context);

    const ast = new ASTNode(CONTROLFLOWS_TRYBLOCK, 0, children);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Try";