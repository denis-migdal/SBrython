import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_bool } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( typeof node.value !== "boolean" )
        return;

    return new ASTNode(node, "literals.bool", SType_bool, node.value);
}

convert.brython_name = "Constant";