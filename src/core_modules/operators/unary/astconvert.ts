import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { bname2pyname } from "structs/BinaryOperators";
import { STYPE_BOOL, STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";
import { set_py_code } from "ast2js";
import { OPERATORS_UNARY } from "core_modules/lists";
import { VALUES } from "dop";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.operand , context );

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    if( op === 'not') {
        const ast = new ASTNode(OPERATORS_UNARY, STYPE_BOOL, [ left ] );
        
        VALUES[ast.id] = "not";
        set_py_code(4*ast.id, node);

        return ast;
    }

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[left.result_type]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type();

    if( type === STYPE_NOT_IMPLEMENTED)
        throw new Error(`${op} ${left.result_type} NOT IMPLEMENTED!`);

    const ast = new ASTNode(OPERATORS_UNARY, type, [ left ] );
    VALUES[ast.id] = op;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["UnaryOp"];