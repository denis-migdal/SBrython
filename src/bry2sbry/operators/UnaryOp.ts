import { Context, convert_node } from "@SBrython/py2ast";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { bname2pyname } from "@SBrython/structs/BinaryOperators";
import { STYPE_BOOL, STYPE_NOT_IMPLEMENTED, STypes } from "@SBrython/structs/STypes";
import { OPERATORS_UNARY } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/dop";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, OPERATORS_UNARY);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.operand , context );

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];

    if( __DEBUG__ && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }

    VALUES[dst] = op;

    if( op === 'not') {

        setResultType(dst, STYPE_BOOL);
        return;
    }

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[resultType(coffset)]?.[op] as STypeFctSubs;

    if( method !== undefined )
        type = method.return_type();

    if( __DEBUG__ && type === STYPE_NOT_IMPLEMENTED)
        throw new Error(`${op} ${resultType(coffset)} NOT IMPLEMENTED!`);

    setResultType(dst, type);
}