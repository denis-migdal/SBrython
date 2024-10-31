import { Context, convert_body, convert_node, listpos } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_bool } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const cond = convert_node(node.test, context);
    const body_true  = convert_node(node.body, context);
    const body_false = convert_node(node.orelse, context);

    console.warn(node.orelse);

    return new ASTNode(node, "controlflows.ternary", body_true.result_type, null, [
        cond,
        body_true,
        body_false
    ]);
}

convert.brython_name = "IfExp";