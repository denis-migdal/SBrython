import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";

export default function convert(node: any, context: Context) {

    const name = node.func.id;
    const fct_type = context.local_symbols[name]!;
    if( fct_type === undefined ) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }
    const ret_type = (fct_type.__call__ as STypeFctSubs).return_type();

    return new ASTNode(node, "functions.call", ret_type, fct_type, [
        convert_node(node.func, context ),
        ...node.args    .map( (e:any) => convert_node(e, context) ),
        ...node.keywords.map( (e:any) => convert_node(e, context) )
            // requires keyword node...
    ]);
}

convert.brython_name = "Call";