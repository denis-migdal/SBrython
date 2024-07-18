import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    if( ! ("func" in node) )
        return;

    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new ASTNode(node, "fctcall", undefined, [
        convert_node(node.func, context ),
        ...node.args.map( (e:any) => convert_node(e, context) )
    ]);
}