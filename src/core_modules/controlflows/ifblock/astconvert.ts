import { set_py_code } from "ast2js";
import { CONTROLFLOWS_IFBLOCK } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    // if
    const children = [
        convert_node(node.test, context),
        convert_node(node.body, context)
    ];

    // else if
    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]) {
        cur = cur.orelse[0];

        children.push(
            convert_node(cur.test, context),
            convert_node(cur.body, context)
        )
    }
    // else
    if( "orelse" in cur && cur.orelse.length !== 0 )
        children.push( convert_node(cur.orelse, context) );

    const ast = new ASTNode(CONTROLFLOWS_IFBLOCK, 0, children);

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "If";