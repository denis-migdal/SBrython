import { Context, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

//TODO: better system...
let is_if = false;

export default function convert(node: any, context: Context) {

    if( ! ("test" in node) )
        return false;

    if( is_if ) {
        is_if = false;

        const cond = convert_node(node.test, context);

        if( node.orelse.length !== 0)
            throw new Error("else/elif not yet supported");
        
        if(cond.result_type !== "bool")
            throw new Error(`Type ${cond.result_type} not yet supported as if condition`);

        return new ASTNode(node, "if", null, [
            cond,
            ...node.body.map( (m:any) => convert_line(m, context) )
        ]);
    }

    is_if = true;

    return new ASTNode(node, "ifblock", null, [
            convert_node(node, context)
        ]);
}