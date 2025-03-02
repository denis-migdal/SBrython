import { set_py_code } from "ast2js";
import { OPERATORS_ASSIGNOP, OPERATORS_BINARY } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { bname2pyname } from "structs/BinaryOperators";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.target , context );
    let right = convert_node(node.value, context);

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }        

    const ast = new ASTNode(OPERATORS_ASSIGNOP, left.result_type,
        [
            left,
            right
        ]
    );

    VALUES[ast.id] = op;
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["AugAssign"];