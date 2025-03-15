import { type Context, convert_node, swapASTNodes } from "@SBrython/sbry/bry2sbry/utils";
import { bname2pyname, reversed_operator } from "@SBrython/sbry/structs/BinaryOperators";
import { AST_OP_BIN } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_NotImplementedType } from "@SBrython/sbry/types";
import Types from "@SBrython/sbry/types/list";
import { Fct, AST_KEY_RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: number, node: any, context: Context) {

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];
    if( __DEBUG__ && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    setType(dst, AST_OP_BIN);

    const coffset = addChild(dst, 2);
    convert_node(coffset  , node.left , context); // left
    convert_node(coffset+1, node.right, context); // right

    const ltype = resultType(coffset);
    const rtype = resultType(coffset+1);

    let type = TYPEID_NotImplementedType;
    let method = Types[ltype][op] as Fct;

    if( method !== undefined )
        type = method[AST_KEY_RETURN_TYPE](rtype);

    // try reversed operator
    if( type === TYPEID_NotImplementedType) {
        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        
        method = Types[rtype][op] as Fct;
        if( method !== undefined)
            type   = method[AST_KEY_RETURN_TYPE](ltype!);

        if( __DEBUG__ && type === TYPEID_NotImplementedType) {
            throw new Error(`${Types[rtype].__name__} ${op} ${Types[ltype].__name__} NOT IMPLEMENTED!`);
        }

        swapASTNodes(coffset, coffset+1); // costly, use 2 ast2js instead ?
    }

    VALUES[dst] = op;

    setResultType(dst, type);
}
