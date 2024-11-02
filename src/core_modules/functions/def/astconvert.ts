import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct, STypeObj } from "structs/SType";
import { getSType, SType_NoneType } from "structs/STypes";
import { default_call } from "../call/ast2js";
import { convert_args } from "../args/astconvert";

export default function convert(node: any, context: Context) {

    //const isMethod = context.type === "class";
    let fct_return_type: null|STypeObj = null;

    const SType_fct: STypeFct = {
        __name__: "function",
        __call__: {
            args_names     : new Array(node.args.args.length+node.args.posonlyargs.length),
            args_pos       : {},
            idx_end_pos    : -1,
            idx_vararg     : -1,
            has_kw         : false,
            return_type    : () => fct_return_type!, // ?
            substitute_call: default_call
        }
    }

    //if( ! isMethod ) {
        // if method add to self_context.symbols ?
        context.local_symbols[node.name] = SType_fct;
    //}

    const last_type   = node.body[node.body.length-1].constructor.$name;
    const impl_return = last_type !== "Return" && last_type !== "Raise";

    const annotation = node.returns?.id;
    if( annotation !== undefined)
        fct_return_type = getSType(annotation);
    else if( impl_return )
        fct_return_type = SType_NoneType;

    // new context for the function local variables
    context = new Context("fct", context);

    // fake the node...
    const args = convert_args(node, SType_fct, context);
    for(let arg of args.children)
        context.local_symbols[arg.value] = arg.result_type;

    const body = convert_node(node.body, context);

    if( impl_return ) {
        const fake_node = {
            constructor: {
                $name: "Return"
            },
                lineno: node.end_lineno,
            end_lineno: node.end_lineno,
                col_offset: node.end_col_offset,
            end_col_offset: node.end_col_offset,
        }
        body.children.push( convert_node(fake_node, context) );
    }
    // recursive.
    if( fct_return_type === null ) {
        //TODO: loop, if, try
        let ret = body.children.filter( n => n.type === "keywords.return");
        fct_return_type = ret[0].result_type!;
    }

    let type = "functions.def";
    //if(isMethod)
    //    type += "(meth)";

    return new ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
}

convert.brython_name = "FunctionDef";