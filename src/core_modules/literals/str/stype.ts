import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, GenEqOperator, Int2Float } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_str = {
    ...GenBinaryOperator('mul', {
        return_type: {'int': 'str'},
        convert: (a) => Int2Float(a),
        same_order: true,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return r`${a}.repeat(${b})`;
        }
    }),
    ...GenBinaryOperator('add', {
        return_type: {'str': 'str'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '+', b);
        }
    })
} satisfies STypeObj;

export default SType_str;