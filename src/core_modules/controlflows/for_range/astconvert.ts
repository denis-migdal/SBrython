import { set_py_code } from "ast2js";
import { CONTROLFLOWS_FOR_RANGE } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STYPE_INT } from "structs/STypes";

export default function convert(node: any, context: Context) {

    if( node.iter.constructor.$name !== "Call" || node.iter.func.id !== "range")
        return undefined;

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    // TODO: jsint opti if this.value not used...
    context.local_symbols[node.value] = STYPE_INT;

    const ast = new ASTNode(CONTROLFLOWS_FOR_RANGE, 0, [
        ... node.iter.args.map( (n:any) => convert_node(n, context) ),
        convert_node(node.body, context)
    ]);

    VALUES[ast.id] = target;

    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "For";