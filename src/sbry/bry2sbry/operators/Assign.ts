import { AST_OP_ASSIGN, AST_OP_ASSIGN_ATTR, AST_OP_ASSIGN_INIT } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, nextSibling, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import Types, { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types/list";
import { TYPEID } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: NODE_ID, node: any, context: Context): false|void {

    let targets = node.targets;
    if( targets === undefined )
        targets = [node.target];

    const coffset = addFirstChild(dst);

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

    const nbChildren = targets.length;

    let cur = coffset;
    for(let i = 0; i < nbChildren; ++i) {
        cur = addSibling(cur);
        convert_node(cur, targets[i], context );
        context.local_symbols[targets[i].id] = result_type;
    }


    let type = AST_OP_ASSIGN;
    if( context.type === "class") {
        type = AST_OP_ASSIGN_ATTR;

        VALUES[dst] = context.parentTypeID;

        const attrname = VALUES[nextSibling(coffset)];
        const attrdef  = { [TYPEID]: result_type };

        Types[context.parentTypeID  ][attrname] = attrdef
        Types[context.parentTypeID-1][attrname] = attrdef; // duplicated (good ?)

    }else if( ! (targets[0].id in context.local_symbols) )
        type = AST_OP_ASSIGN_INIT;
    
    setType(dst, type);
}

// ["Assign", "AnnAssign"];