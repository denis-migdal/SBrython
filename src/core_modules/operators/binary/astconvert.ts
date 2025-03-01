import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { bname2pyname, reversed_operator } from "structs/BinaryOperators";
import { STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";
import { set_py_code } from "ast2js";
import { OPERATORS_BINARY } from "core_modules/lists";
import { VALUES } from "dop";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.left , context );
    let right = convert_node(node.right, context);

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }        


    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[left.result_type]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type(right.result_type!);

    // try reversed operator
    if( type === STYPE_NOT_IMPLEMENTED) {
        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        method = STypes[right.result_type]?.[op] as STypeFctSubs;
        if( method !== undefined)
            type   = method.return_type(left.result_type!);

        if( type === STYPE_NOT_IMPLEMENTED)
            throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);

        [left, right] = [right, left];
    }

    const ast = new ASTNode(OPERATORS_BINARY, type,
        [
            left,
            right
        ]
    );

    VALUES[ast.id] = op;
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["BinOp"];