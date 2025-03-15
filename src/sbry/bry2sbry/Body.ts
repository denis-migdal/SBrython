import { AST_BODY } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node } from "@SBrython/sbry/py2ast";

import Types from "@SBrython/sbry/types/list";
import { ARGS_INFO, AST_KEY_RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_BODY);

    const nbChildren = node.length;
    const coffset    = addChild(dst, nbChildren);

    const beg = Types.length;

    for(let i = 0; i < nbChildren; ++i) {

        let cn = node[i];
        if(cn.constructor.$name === "Expr") // only found in body ?
            cn = cn.value;

        convert_node(i + coffset, cn, context);
    }

    // generate ungenerated functions...
    const end = Types.length;
    for(let i = beg; i < end; ++i) {
        const obj = Types[i];
        if( obj.__name__ !== "function")
            continue;
        const generate = obj.__call__[ARGS_INFO].generate;
        if( generate !== undefined)
            obj.__call__[AST_KEY_RETURN_TYPE](); // h4ck
    }
}