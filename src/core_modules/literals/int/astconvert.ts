import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "number" )
        return;

    return new ASTNode(node, "literals.int", "int", node.value);
}

convert.brython_name = "Constant";