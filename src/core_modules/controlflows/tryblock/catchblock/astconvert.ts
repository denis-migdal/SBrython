import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    //TODO: handlers...
    console.log("cb", node);
    return new ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
        convert_body(node, context)
        /* this.handlers */ //TODO...
    ]);
}

convert.brython_name = "Try.catchblock";