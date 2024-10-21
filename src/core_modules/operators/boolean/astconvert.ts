import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

const bname2jsop = {
    'And': '&&',
    'Or' : '||'
};

export default function convert(node: any, context: Context) {

    let children = node.values.map( n => convert_node(n, context ) );

    const op   = bname2jsop[node.op.constructor.$name];
    const type = children[0].result_type;

    return new ASTNode(node, "operators.boolean", type, op, children);
}

convert.brython_name = ["BoolOp"];