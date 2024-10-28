import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_str } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "string")
        return;

    return new ASTNode(node, "literals.str", SType_str, node.value);
}

convert.brython_name = "Constant";