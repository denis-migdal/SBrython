import { Context } from "py2ast";

export default function convert(node: any, _context: Context) {

    return; // currently comments aren't included in Brython's AST

    //const astnode = new ASTNode(node, "literals.bool", node.value);
    //astnode.result_type = "bool";
    //return astnode;
}