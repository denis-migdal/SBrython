import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { getSType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const name = node.func.id;
    let   ret_type = null;

    // is a class ?
    const klass = undefined; //getSType(node.func.id); //TODO...

    if( klass !== undefined )
        {}//ret_type = (klass.__init__ as STypeFctSubs).return_type();
    else {
        //TODO fct in object...

        const fct_type = context.local_symbols[name]!;
        ret_type = (fct_type.__call__ as STypeFctSubs).return_type();
    }

    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new ASTNode(node, "functions.call", ret_type, klass, [
        convert_node(node.func, context ),
        ...node.args.map( (e:any) => convert_node(e, context) )
    ]);
}

convert.brython_name = "Call";