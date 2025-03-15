import { AST_OP_ASSIGN, AST_OP_ASSIGN_INIT } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, type } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types";

export default function convert(dst: number, node: any, context: Context): false|void {

    let targets = node.targets;
    if( targets === undefined )
        targets = [node.target];

    let type = AST_OP_ASSIGN;

    if(    context.type !== "class"
        && targets[0].constructor.$name === "Name"
        && ! (targets[0].id in context.local_symbols)
    ) {
        type = AST_OP_ASSIGN_INIT;
    }
    
    setType(dst, type);

    const nbChildren = targets.length + 1;
    const coffset = addChild(dst, nbChildren);

    convert_node(coffset, node.value, context); // right
    let rtype = resultType(coffset);

    let result_type = null;

    const annotation = node.annotation?.id;
    if( annotation !== undefined)
        result_type = context.local_symbols[annotation]; //?

    if( __DEBUG__ && result_type !== null && result_type !== rtype )
        console.warn("Wrong result_type");

    if( result_type === null ) {
        result_type = rtype;
        if( rtype === TYPEID_jsint)
            result_type = TYPEID_int; // prevents issues.
            //TODO: only if assign...
    }

    setResultType(dst, result_type);

    for(let i = 1; i < nbChildren; ++i) {
    
        convert_node(coffset+i, targets[i-1], context );
        context.local_symbols[targets[i-1].id] = result_type;
    }
}

// ["Assign", "AnnAssign"];