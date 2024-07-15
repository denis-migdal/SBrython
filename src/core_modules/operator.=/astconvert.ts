import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("targets" in node) )
        return false;

    const left  = convert_node(node.targets[0], context );
    const right = convert_node(node.value,      context);

    const astnode = new ASTNode(node, "Operator.=", null,
        [
            left,
            right,
        ]
    );

    if( left.type === "symbol") {

        // if exists, ensure type.
        if( left.value in context.local_variables) {
            const result_type = context.local_variables[left.value];
            if( result_type !== null && result_type !== right.result_type)
                throw new Error("Wrong result_type");
        } else {
            context.local_variables[left.value] = right.result_type;
            (astnode as any).is_init = true;
        }
    }
    
    astnode.result_type = right.result_type;
    return astnode;
}