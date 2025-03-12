import { Context, convert_node, swapASTNodes } from "@SBrython/py2ast";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { bname2pyname, reversed_operator } from "@SBrython/structs/BinaryOperators";
import { STYPE_NOT_IMPLEMENTED, STypes } from "@SBrython/structs/STypes";
import { OPERATORS_BINARY } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/dop";

export default function convert(dst: number, node: any, context: Context) {

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];
    if( __DEBUG__ && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    setType(dst, OPERATORS_BINARY);

    const coffset = addChild(dst, 2);
    convert_node(coffset  , node.left , context); // left
    convert_node(coffset+1, node.right, context); // right

    const ltype = resultType(coffset);
    const rtype = resultType(coffset+1);

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[ltype]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type(rtype);

    // try reversed operator
    if( type === STYPE_NOT_IMPLEMENTED) {
        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        method = STypes[rtype]?.[op] as STypeFctSubs;
        if( method !== undefined)
            type   = method.return_type(ltype!);

        if( __DEBUG__ && type === STYPE_NOT_IMPLEMENTED)
            throw new Error(`${rtype} ${op} ${ltype} NOT IMPLEMENTED!`);

        swapASTNodes(coffset, coffset+1); // costly, use 2 ast2js instead ?
    }

    VALUES[dst] = op;

    setResultType(dst, type);
}

convert.brython_name = ["BinOp"];