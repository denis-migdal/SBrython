import { AST_FCT_CALL } from "@SBrython/sbry/ast2js/";
import { addChild, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code } from "@SBrython/sbry/bry2sbry/utils";
import Types from "@SBrython/sbry/types/list";
import keyword from "./keyword";
import { Fct, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: number, node: any, context: Context) {

    const name = node.func.id;
    const fct_type = context.local_symbols[name]!;
    if( __DEBUG__ && fct_type === undefined ) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }

    const fct = Types[fct_type];
    const ret_type = (fct.__call__ as Fct)[RETURN_TYPE]();

    setType      (dst, AST_FCT_CALL);
    setResultType(dst, ret_type);
    let coffset = addChild(dst, 1 + node.args.length + node.keywords.length);

    convert_node(coffset++, node.func, context ); // fct to call

    for(let i = 0; i < node.args.length; ++i)
        convert_node(coffset++, node.args[i], context );

    for(let i = 0; i < node.keywords.length; ++i) {
        keyword(coffset, node.keywords[i], context );
        if(__DEBUG__) set_py_code(coffset, node.keywords[i]);
        ++coffset;
    }

    VALUES[dst] = fct;
}