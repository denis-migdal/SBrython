import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    const target = node.target.id;
    context.local_variables[target] = null; //TODO

    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range") {

        return new ASTNode(node, "controlflows.for(range)", null, target, [
            ... node.iter.args.map( (n:any) => convert_node(n, context) ),
            convert_body(node, context)
        ]);

    }

    return new ASTNode(node, "controlflows.for", null, target, [
        convert_node(node.iter, context),
        convert_body(node, context)
    ]);
}

convert.brython_name = "For";