import { OPERATORS__EQ, SYMBOL } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, type } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { getSTypeID, STYPE_INT, STYPE_JSINT } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, context: Context): false|void {

    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [node.target];

    if(    context.type !== "class"
        && targets[0].constructor.$name === "Name"
        && !(targets[0].id in context.local_symbols)
    )
        return false;

    setType(dst, OPERATORS__EQ);

    const nbChildren = targets.length + 1;
    const coffset = addChild(dst, nbChildren);

    convert_node(coffset, node.value, context); // right
    let rtype = resultType(coffset);

    let result_type = null;

    const annotation = node?.annotation?.id;
    if( annotation !== undefined)
        result_type = getSTypeID(annotation);

    if( __DEBUG__ && result_type !== null && result_type !== rtype )
        console.warn("Wrong result_type");

    if( result_type === null ) {
        result_type = rtype;
        if( rtype === STYPE_JSINT)
            result_type = STYPE_INT; // prevents issues.
            //TODO: only if assign...
    }

    setResultType(dst, result_type);

    for(let i = 1; i < nbChildren; ++i) {

        convert_node(coffset+i, targets[i-1], context );
        context.local_symbols[targets[i-1].id] = result_type;

/*
        // could be improved I guess.
        if( type(i+coffset) === SYMBOL) {
    
            // if exists, ensure type.
            const ltype = context.local_symbols[i+coffset];
            if( ltype !== undefined ) {
                if( ltype !== 0 && rtype !== ltype)
                    {}//console.warn("Wrong result_type");
    
                // annotation_type
            }
        }
*/
    }
}

convert.brython_name = ["Assign", "AnnAssign"];