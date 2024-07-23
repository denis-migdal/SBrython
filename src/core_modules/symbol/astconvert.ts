import _r_ from "../../core_runtime/lists";
import { Context } from "py2ast";
import { ASTNode } from "structs/ASTNode";

function isClass(_: unknown) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}

export default function convert(node: any, context: Context) {

    let result_type = null;
    let value = node.id;

    if( node.id in context.local_variables)
        result_type = context.local_variables[node.id];
    else if(node.id in _r_) {
        value = `_r_.${node.id}`;
        if( isClass(_r_[node.id as keyof typeof _r_]) )
            result_type = `class.${node.id}`;
    }

   return new ASTNode(node, "symbol", result_type, value);
}


convert.brython_name = "Name";