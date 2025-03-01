import { set_py_code } from "ast2js";
import { CONTROLFLOWS_TRYBLOCK_CATCH } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    let children;
    if( node.type !== undefined) {
        children = [convert_node(node.type, context), convert_node(node.body, context)]
    } else {
        children = [ convert_node(node.body, context) ];
    }

    const ast = new ASTNode(CONTROLFLOWS_TRYBLOCK_CATCH, 0, children);
    
    VALUES[ast.id] = node.name;
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "ExceptHandler";