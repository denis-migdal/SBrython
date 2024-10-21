import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_NOT_IMPLEMENTED } from "structs/SType";
import { bname2pyname, name2SType } from "structs/BinaryOperators";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.operand , context );

    let op = bname2pyname[node.op.constructor.$name];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    if( op === 'not')
        return new ASTNode(node, "operators.unary", "bool", "not", [ left ] );

    let type = SType_NOT_IMPLEMENTED;
    let method = name2SType[left.result_type as STypeName]?.[op];

    if( method !== undefined )
        type = method.return_type();

    if( type === SType_NOT_IMPLEMENTED)
        throw new Error('NOT IMPLEMENTED!');

    return new ASTNode(node, "operators.unary", type, op, [ left ] );
}

convert.brython_name = ["UnaryOp"];