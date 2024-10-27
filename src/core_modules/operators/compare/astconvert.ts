import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { bname2pyname } from "structs/BinaryOperators";

/*
- ge/le
- gt/lt
*/

export default function convert(node: any, context: Context) {

    const ops = node.ops.map( (e: any) => {
        const op = (bname2pyname as any)[e.constructor.$name];
        if( op === undefined)
            throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });

    const left   = convert_node(node.left, context );
    const rights = node.comparators.map( (n:any) => convert_node(n, context) );

    return new ASTNode(node, `operators.compare`, "bool", ops,
        [
            left,
            ...rights,
        ]
    );
}

convert.brython_name = "Compare";