import { set_py_code } from "ast2js";
import { OPERATORS__EQ, SYMBOL } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { getSTypeID, STYPE_INT, STYPE_JSINT } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [node.target];

    if(    context.type !== "class"
        && targets[0].constructor.$name === "Name"
        && !(targets[0].value in context.local_symbols)
    )
        return;

    const right = convert_node(node.value, context);
    let right_type = right.result_type;

    let result_type = null;

    const annotation = node?.annotation?.id;
    if( annotation !== undefined)
        result_type = getSTypeID(annotation);


    if( result_type !== null && result_type !== right_type ) {
            console.warn("Wrong result_type");
    }
    if( result_type === null ) {
        result_type = right_type;
        if( right_type === STYPE_JSINT)
            result_type = STYPE_INT; // prevents issues.
            //TODO: only if assign...
    }

    const lefts = targets.map( (n:any) => {

        const left  = convert_node(n, context );

        // could be improved I guess.
        if( left.type_id === SYMBOL) {
    
            // if exists, ensure type.
            const lsym = context.local_symbols[n.id];
            if( lsym !== undefined ) {
                const left_type = lsym;
                if( left_type !== null && right_type !== left_type)
                    {}//console.warn("Wrong result_type");
    
                // annotation_type
            }
        }

        return left;
    });

    const ast = new ASTNode(OPERATORS__EQ, result_type,
        [
            ...lefts,
            right,
        ]
    );    
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = ["Assign", "AnnAssign"];