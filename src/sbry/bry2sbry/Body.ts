import { AST_BODY } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";

import Types from "@SBrython/sbry/types/list";
import { ARGS_INFO, Callable, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_BODY);

    const nbChildren = node.length;

    if(nbChildren === 0)
        return;

    let cur    = addFirstChild(dst);

    let cn = node[0];
    if(cn.constructor.$name === "Expr") // only found in body ?
        cn = cn.value;

    convert_node(cur, cn, context);


    for(let i = 1; i < nbChildren; ++i) {

        cur = addSibling(cur);

        let cn = node[i];
        if(cn.constructor.$name === "Expr") // only found in body ?
            cn = cn.value;

        convert_node(cur, cn, context);
    }

    const beg = Types.length;

    // generate ungenerated functions...
    const end = Types.length;
    for(let i = beg; i < end; ++i) {
        const obj = Types[i] as Callable;
        if( obj.__name__ !== "function")
            continue;
        const generate = obj.__call__[ARGS_INFO].generate;
        if( generate !== undefined)
            obj.__call__[RETURN_TYPE](); // h4ck
    }
}