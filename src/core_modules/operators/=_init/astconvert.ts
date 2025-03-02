import { OPERATORS__EQ_INIT } from "core_modules/lists";
import { addChild, resultType, setResultType, setType } from "dop";
import { Context, convert_node } from "py2ast";
import { getSTypeID, STYPE_INT, STYPE_JSINT } from "structs/STypes";

export default function convert(dst: number, node: any, context: Context): false|void {

    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [node.target];

    if(    context.type === "class"
        || targets[0].constructor.$name !== "Name"
        || targets[0].id in context.local_symbols
    )
        return false;

    setType(dst, OPERATORS__EQ_INIT);
    const nbChildren = targets.length + 1;
    const coffset = addChild(dst, nbChildren);

    convert_node(coffset, node.value, context); // right
    let rtype = resultType(coffset);

    let result_type = null;

    const annotation = node?.annotation?.id;
    if( annotation !== undefined)
        result_type = getSTypeID(annotation);


    if( result_type !== null && result_type !== rtype )
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
    }
}

convert.brython_name = ["Assign", "AnnAssign"];