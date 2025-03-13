import { OPERATORS_ASSIGNOP } from "@SBrython/core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { bname2pyname } from "@SBrython/structs/BinaryOperators";

export default function convert(dst: number, node: any, context: Context) {

    let op = bname2pyname[node.op.constructor.$name as keyof typeof bname2pyname];
    if( __DEBUG__ && op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    VALUES[dst] = op;

    setType(dst, OPERATORS_ASSIGNOP);
    const coffset = addChild(dst, 2);

    convert_node(coffset,   node.target, context);
    convert_node(coffset+1, node.value,  context);

    setResultType(dst, resultType(coffset));
}