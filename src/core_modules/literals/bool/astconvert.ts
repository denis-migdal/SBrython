import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "boolean" )
        return;

    return new ASTNode(node, "literals.bool", "bool", node.value);
}

convert.brython_name = "Constant";