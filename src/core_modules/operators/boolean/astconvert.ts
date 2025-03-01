import { set_py_code } from "ast2js";
import { OPERATORS_BOOLEAN } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

const bname2jsop = {
    'And': '&&',
    'Or' : '||'
};

export default function convert(node: any, context: Context) {

    let children = node.values.map( (n:any) => convert_node(n, context ) );

    const op   = bname2jsop[node.op.constructor.$name as keyof typeof bname2jsop];
    const type = children[0].result_type;

    const ast = new ASTNode(OPERATORS_BOOLEAN, type, children);
    
    VALUES[ast.id] = op;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["BoolOp"];