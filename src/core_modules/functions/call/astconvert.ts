import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { name2SType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    //TODO: can be better
    const klass = name2SType(node.func.id);
    let type = null;
    if( klass !== undefined )
        type = klass.__init__.return_type();
    
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new ASTNode(node, "functions.call", type, klass, [
        convert_node(node.func, context ),
        ...node.args.map( (e:any) => convert_node(e, context) )
    ]);
}

convert.brython_name = "Call";