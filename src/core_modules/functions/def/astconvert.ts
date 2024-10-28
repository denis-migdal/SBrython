import { Context, convert_args, convert_body } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeObj } from "structs/SType";
import { getSType, SType_NoneType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const args = convert_args(node, context);

    const isMethod = context.type === "class";
    let fct_return_type: null|STypeObj = null;

    if( ! isMethod ) {

        const SType_fct = {
            __name__: "function",
            __call__: {
                return_type    : () => fct_return_type, // ?
                call_substitute: () => "" /* argument parsing */
            }
        }

        context.local_symbols[node.name] = SType_fct;

        const annotation = node.returns?.id;
        if( annotation !== undefined)
            fct_return_type = getSType(annotation);
        else {

            //TODO: change search strat...

            //TODO: loops, try, if
            let returns = node.body.filter( (n:any) => n.constructor.$name === "Return" );
            
            if( returns.length === 0)
                fct_return_type = SType_NoneType;
            // TODO: return;
        }
    }

    // new context for the function local variables
    context = new Context("fct", context);
    const body = convert_body(node, context);

    // recursive.
    if( fct_return_type === null ) {
        //TODO: loop, if, try
        let ret = body.children.filter( n => n.type === "keywords.return");
        fct_return_type = ret[0].result_type!;
    }

    for(let arg of args.children)
        context.local_symbols[arg.value] = arg.result_type;

    let type = "functions.def";
    if(isMethod)
        type += "(meth)";

    return new ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
}

convert.brython_name = "FunctionDef";