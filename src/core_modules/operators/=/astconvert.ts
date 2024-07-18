import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("targets" in node) && ! ("target" in node) )
        return;

    let target = node.target;
    if( "targets" in node)
        target = node.targets[0];

    const left  = convert_node(target, context );
    const right = convert_node(node.value,      context);

    const astnode = new ASTNode(node, "operators.=", null,
        [
            left,
            right,
        ]
    );

    let right_type: string|null = right.result_type;
    if( "annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if( right.result_type !== null && right.result_type !== right_type)
            throw new Error("Wrong result_type");
    }
    astnode.result_type = right_type;

    if( left.type === "symbol") {

        // if exists, ensure type.
        if( left.value in context.local_variables) {
            const result_type = context.local_variables[left.value];
            if( result_type !== null && right_type !== result_type)
                throw new Error("Wrong result_type");

            // annotation_type
        } else {
            context.local_variables[left.value] = right_type;
            (astnode as any).is_init = true;
        }
    }
    
    return astnode;
}