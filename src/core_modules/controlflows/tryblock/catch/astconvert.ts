import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    //TODO: condition...
    return new ASTNode(node, `controlflows.catch`, null, null, [
        convert_body(node, context)
    ]);
}

convert.brython_name = "ExceptHandler";