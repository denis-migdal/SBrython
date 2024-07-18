import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {
    return new ASTNode(node, "pass", null);
}


convert.brython_name = "Pass";