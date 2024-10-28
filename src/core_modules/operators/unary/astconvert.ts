import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { bname2pyname } from "structs/BinaryOperators";
import { SType_bool, SType_NotImplementedType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.operand , context );

    let op = (bname2pyname as any)[node.op.constructor.$name];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    if( op === 'not')
        return new ASTNode(node, "operators.unary", SType_bool, "not", [ left ] );

    let type = SType_NotImplementedType;
    let method = left.result_type?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type();

    if( type === SType_NotImplementedType) {
        throw new Error(`${op} ${left.result_type} NOT IMPLEMENTED!`);

        throw new Error('NOT IMPLEMENTED!');
    }

    return new ASTNode(node, "operators.unary", type, op, [ left ] );
}

convert.brython_name = ["UnaryOp"];