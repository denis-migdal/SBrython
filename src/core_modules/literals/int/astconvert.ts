import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, _context: Context) {

    let value = node.value;

    if(value.__class__?.__qualname__ === "int")
        value = value.value;

    if( typeof value !== "number" && typeof value !== "bigint" )
        return;

    return new ASTNode(node, "literals.int", "int", value);
}

convert.brython_name = "Constant";