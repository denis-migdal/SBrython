import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "literals.f-string.FormattedValue", null, null, [
        convert_node(node.value, context)
    ]);
}

convert.brython_name = "FormattedValue";