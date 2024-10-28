import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_float } from "structs/STypes";

export default function convert(node: any, _context: Context) {

    if( ! (node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float")
        return;

    return new ASTNode(node, "literals.float", SType_float, node.value.value);
}

convert.brython_name = "Constant";