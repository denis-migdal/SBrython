import { AST_CALL } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code } from "@SBrython/sbry/bry2sbry/utils";
import Types from "@SBrython/sbry/types/list";
import keyword from "./keyword";
import { Fct, RETURN_TYPE, Type } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    let fct: Type;
    let cur = addFirstChild(dst);;
    if( "attr" in node.func ) {
        const name =  node.func.attr;

        convert_node(cur, node.func.value, context );
        const type = resultType(cur);
        cur = addSibling(cur);

        fct = Types[type][name] as Type;

        if( __SBRY_MODE__ === "dev" && fct === undefined ) {
            console.warn(node);
            throw new Error(`Method ${name} not defined`);
        }
    } else {
        const name = node.func.id;
        const fct_type = context.local_symbols[name]!;
        
        if( __SBRY_MODE__ === "dev" && fct_type === undefined ) {
            console.warn(node);
            console.warn(context.local_symbols);
            throw new Error(`Function ${name} not defined`);
        }

        fct = Types[fct_type];
    }

    const ret_type = (fct.__call__ as Fct)[RETURN_TYPE]();

    setType      (dst, AST_CALL);
    setResultType(dst, ret_type);

    convert_node(cur, node.func, context ); // fct to call

    for(let i = 0; i < node.args.length; ++i) {
        cur = addSibling(cur);
        convert_node(cur, node.args[i], context );
    }

    for(let i = 0; i < node.keywords.length; ++i) {
        cur = addSibling(cur);
        keyword(cur, node.keywords[i], context );
        if(__SBRY_MODE__ === "dev") set_py_code(cur, node.keywords[i]);
    }

    VALUES[dst] = fct;
}