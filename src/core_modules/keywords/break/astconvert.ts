import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    return new ASTNode(node, "keywords.break", null);
}

convert.brython_name = "Break";