import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { getSType, SType_int, SType_jsint } from "structs/STypes";

export default function convert(node: any, context: Context) {

    let type = "operators.=";

    const right = convert_node(node.value, context);
    let right_type = right.result_type;

    let result_type = null;

    const annotation = node?.annotation?.id;
    if( annotation !== undefined)
        result_type = getSType(annotation);


    if( result_type !== null && result_type !== right_type ) {
            console.warn("Wrong result_type");
    }
    if( result_type === null ) {
        result_type = right_type;
        if( right_type === SType_jsint)
            result_type = SType_int; // prevents issues.
            //TODO: only if assign...
    }

    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [node.target];

    const lefts = targets.map( (n:any) => {

        const left  = convert_node(n, context );

        // could be improved I guess.
        if( left.type === "symbol") {
    
            // if exists, ensure type.
            if( left.value in context.local_symbols) {
                const left_type = context.local_symbols[left.value];
                if( left_type !== null && right_type !== left_type)
                    {}//console.warn("Wrong result_type");
    
                // annotation_type
            } else if (context.type !== "class") {
                context.local_symbols[left.value] = result_type;
                type += "(init)";
            }
        }

        return left;
    });

    return new ASTNode(node, type, result_type, null,
        [
            ...lefts,
            right,
        ]
    );
}

convert.brython_name = ["Assign", "AnnAssign"];