import { Context, convert_node } from "py2ast";
import { STypeFctSubs } from "structs/SType";
import { bname2pyname } from "structs/BinaryOperators";
import { STYPE_BOOL, STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";
import { OPERATORS_UNARY } from "core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "dop";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, OPERATORS_UNARY);
    const coffset = addChild(dst, 1);

    convert_node(coffset, node.operand , context );

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];

    if( op === undefined) {
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

    if( type === STYPE_NOT_IMPLEMENTED)
        throw new Error(`${op} ${resultType(coffset)} NOT IMPLEMENTED!`);

    setResultType(dst, type);
}

convert.brython_name = ["UnaryOp"];