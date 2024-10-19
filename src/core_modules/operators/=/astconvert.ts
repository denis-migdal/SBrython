import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    let type = "operators.=";

    const right = convert_node(node.value, context);
    let right_type: string|null = right.result_type;
    if( "annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if( right.result_type !== null && right.result_type !== right_type)
            console.warn("Wrong result_type");
    }

    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [node.target];

    const lefts = targets.map( (n:any) => {

        const left  = convert_node(n, context );

        if( left.type === "symbol") {
    
            // if exists, ensure type.
            if( left.value in context.local_variables) {
                const result_type = context.local_variables[left.value];
                if( result_type !== null && right_type !== result_type)
                    console.warn("Wrong result_type");
    
                // annotation_type
            } else if (context.type !== "class") {
                context.local_variables[left.value] = right_type;
                type += "(init)";
            }
        }

        return left;
    });

    return new ASTNode(node, type, right_type, null,
        [
            ...lefts,
            right,
        ]
    );
}

convert.brython_name = ["Assign", "AnnAssign"];