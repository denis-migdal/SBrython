import { set_py_code } from "ast2js";
import { CLASS_CLASSDEF } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { getSTypeID } from "structs/STypes";

export default function convert(node: any, context: Context) {

    context.local_symbols[node.name] = getSTypeID(node.name);

    context = new Context("class", context);

    if( node.bases.length > 1)
        throw new Error('Not implemented');

    let children = node.bases.length === 1 ?
          [convert_node(node.bases[0], context), convert_node(node.body, context)]
        : [convert_node(node.body, context)];

    const ast = new ASTNode(CLASS_CLASSDEF, 0, children);

    VALUES[ast.id] = node.name;
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "ClassDef";