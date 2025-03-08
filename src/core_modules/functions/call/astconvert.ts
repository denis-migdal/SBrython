import { FUNCTIONS_CALL } from "@SBrython/core_modules/lists";
import { addChild, setResultType, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { STypes } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, context: Context) {

    const name = node.func.id;
    const fct_type = context.local_symbols[name]!;
    if( fct_type === undefined ) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }

    const fct = STypes[fct_type];
    const ret_type = (fct.__call__ as STypeFctSubs).return_type();

    setType      (dst, FUNCTIONS_CALL);
    setResultType(dst, ret_type);
    let coffset = addChild(dst, 1 + node.args.length + node.keywords.length);

    convert_node(coffset++, node.func, context );

    for(let i = 0; i < node.args.length; ++i)
        convert_node(coffset++, node.args[i], context );
    for(let i = 0; i < node.keywords.length; ++i)
        convert_node(coffset++, node.keywords[i], context );

    VALUES[dst] = fct;
}

convert.brython_name = "Call";