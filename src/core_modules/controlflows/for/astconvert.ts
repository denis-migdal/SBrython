import { Context, convert_body, convert_line, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { SType_int } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const target = node.target.id;
    context.local_symbols[target] = null; //TODO

    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range") {

        // TODO: jsint opti if this.value not used...
        context.local_symbols[node.value] = SType_int;

        return new ASTNode(node, "controlflows.for(range)", null, target, [
            ... node.iter.args.map( (n:any) => convert_node(n, context) ),
            convert_body(node, context)
        ]);

    }

    //TODO: get type...
    return new ASTNode(node, "controlflows.for", null, target, [
        convert_node(node.iter, context),
        convert_body(node, context)
    ]);
}

convert.brython_name = "For";