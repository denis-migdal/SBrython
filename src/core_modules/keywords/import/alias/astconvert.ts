import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "keywords.import.alias", null, [node.name, node.asname]);
}

convert.brython_name = ["alias"];