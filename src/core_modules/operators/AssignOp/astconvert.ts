import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { bname2pyname } from "structs/BinaryOperators";

export default function convert(node: any, context: Context) {

    let left  = convert_node(node.target , context );
    let right = convert_node(node.value, context);

    let op = (bname2pyname as any)[node.op.constructor.$name];

    if( op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }        

    return new ASTNode(node, "operators.binary", left.result_type, op,
        [
            left,
            right
        ]
    );
}

convert.brython_name = ["AugAssign"];