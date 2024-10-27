import { Context, convert_args, convert_body } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { _name2SType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const args = convert_args(node, context);


    const isMethod = context.type === "class";
    let fct_return_type = "klass"; //TODO...

    if( ! isMethod ) {

        fct_return_type = node.returns?.id;

        if( fct_return_type === undefined ) {

            //TODO: loops, try, if
            let returns = node.body.filter( (n:any) => n.constructor.$name === "Return" );
            
            if( returns.length === 0)
                fct_return_type = 'None';
            // TODO: return;
        }

        if( fct_return_type !== undefined ) {

            const signature = `() -> ${fct_return_type}`;


            context.local_variables[node.name] = signature;
            _name2SType[signature] = {
                __call__: {
                    return_type: () => fct_return_type,
                    call_substitute: () => "" /* argument parsing */
                }
            }
        }
    }

    // new context for the function local variables
    let old_context = context;
    context = new Context("fct", context);
    const body = convert_body(node, context);

    // recursive.
    if( fct_return_type === undefined ) {
        //TODO: loop, if, try
        let ret = body.children.filter( n => n.type === "keywords.return");
        
        fct_return_type = ret[0].result_type!;

        const signature = `() -> ${fct_return_type}`;

            //Issue: what if other context duplications ?
            context    .local_variables[node.name] = signature;
            old_context.local_variables[node.name] = signature;
            _name2SType[signature] = {
                __call__: {
                    return_type: () => fct_return_type,
                    call_substitute: () => "" /* argument parsing */
                }
            }
    }

    for(let arg of args.children)
        context.local_variables[arg.value] = arg.result_type;

    let type = "functions.def";
    if(isMethod)
        type += "(meth)";

    return new ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
}

convert.brython_name = "FunctionDef";