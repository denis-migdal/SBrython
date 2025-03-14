import { Context, convert_node } from "@SBrython/py2ast";
import { bname2pyname } from "@SBrython/structs/BinaryOperators";
import { OPERATORS_UNARY } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/dop";
import { TYPEID_bool, TYPEID_int, TYPEID_NotImplementedType } from "@SBrython/types";
import Types from "@SBrython/types/list";
import { Fct, RETURN_TYPE } from "@SBrython/types/utils/types";

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

    if( op === 'not') { // logical not
        setResultType(dst, TYPEID_bool);
        return;
    }

    let type = TYPEID_NotImplementedType;
    let method = Types[resultType(coffset)][op] as Fct;

    if( method !== undefined )
        type = method[RETURN_TYPE]();

    if( __DEBUG__ && type === TYPEID_NotImplementedType) {
        console.warn(Types[resultType(coffset)].__name__);
        throw new Error(`${op} ${Types[resultType(coffset)].__name__} NOT IMPLEMENTED!`);
    }

    setResultType(dst, type);
}