import { Context, convert_args, convert_body, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const args = convert_args(node, context);

    // new context for the function local variables
    context = {
        ...context
    }
    context.local_variables = {...context.local_variables};
    for(let arg of args.children)
        context.local_variables[arg.value] = arg.result_type;

    // return type... node.returns.id

    return new ASTNode(node, "functions.def", null, node.name, [
        args,
        convert_body(node, context)
    ]);
}

convert.brython_name = "FunctionDef";