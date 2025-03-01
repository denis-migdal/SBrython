import { set_py_code } from "ast2js";
import { FUNCTIONS_CALL } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { STypes } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const name = node.func.id;
    const fct_type = context.local_symbols[name]!;
    if( fct_type === undefined ) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }

    const fct = STypes[fct_type];
    const ret_type = (fct.__call__ as STypeFctSubs).return_type();

    const ast = new ASTNode( FUNCTIONS_CALL, ret_type, [
        convert_node(node.func, context ),
        ...node.args    .map( (e:any) => convert_node(e, context) ),
        ...node.keywords.map( (e:any) => convert_node(e, context) )
            // requires keyword node...
    ]);

    VALUES[ast.id] = fct;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Call";