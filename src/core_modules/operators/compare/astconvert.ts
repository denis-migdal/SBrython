import { set_py_code } from "ast2js";
import { OPERATORS_COMPARE } from "core_modules/lists";
import { VALUES } from "dop";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { bname2pyname } from "structs/BinaryOperators";
import { STYPE_BOOL } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const ops = node.ops.map( (e: any) => {
        const op = bname2pyname[e.constructor.$name as keyof typeof bname2pyname];
        if( op === undefined)
            throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });

    const left   = convert_node(node.left, context );
    const rights = node.comparators.map( (n:any) => convert_node(n, context) );

    const ast = new ASTNode(OPERATORS_COMPARE, STYPE_BOOL,
        [
            left,
            ...rights,
        ]
    );

    VALUES[ast.id] = ops;
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "Compare";