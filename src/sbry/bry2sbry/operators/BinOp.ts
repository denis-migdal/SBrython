import { type Context, convert_node } from "@SBrython/sbry/bry2sbry/utils";
import { bname2pyname, reversed_operator } from "@SBrython/sbry/structs/BinaryOperators";
import { AST_OP_BIN } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, resultType, setFirstChild, setResultType, setSibling, setType, VALUES } from "@SBrython/sbry/dop";
import { TYPEID_NotImplementedType } from "@SBrython/sbry/types";
import Types from "@SBrython/sbry/types/list";
import { Fct, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];
    if( __DEBUG__ && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    setType(dst, AST_OP_BIN);

    const  left_id = addFirstChild(dst);
    const right_id = addSibling(left_id);
    convert_node(left_id , node.left , context); // left
    convert_node(right_id, node.right, context); // right

    const ltype = resultType(left_id);
    const rtype = resultType(right_id);

    let type = TYPEID_NotImplementedType;
    let method = Types[ltype][op] as Fct;

    if( method !== undefined )
        type = method[RETURN_TYPE](rtype);

    // try reversed operator
    if( type === TYPEID_NotImplementedType) {
        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        
        method = Types[rtype][op] as Fct;
        if( method !== undefined)
            type   = method[RETURN_TYPE](ltype!);

        if( __DEBUG__ && type === TYPEID_NotImplementedType) {
            throw new Error(`${Types[rtype].__class__?.__name__} ${op} ${Types[ltype].__class__?.__name__} NOT IMPLEMENTED!`);
        }

        // swap left&right order...
        setFirstChild(dst, right_id);
        setSibling( left_id, 0);
        setSibling(right_id, left_id);
    }

    VALUES[dst] = op;

    setResultType(dst, type);
}
