import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, genBinaryOps, GenEqOperator, Int2Float, unary_jsop } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_float = {
    ...GenEqOperator({
        supported_types: ["float", "bool"],
        call_substitute(node, left, op, right) {
            return binary_jsop(node, left, op, right);
        },
    }),
    "__neg__": {
        return_type: () => 'float',
        call_substitute: (node: ASTNode, a: ASTNode) => {
            return unary_jsop(node, '-', a);
        }
    },
    ...genBinaryOps('float',
                    ['**', '*', '/', '%', '+', '-'],
                    ['float', 'int', 'bool'],
                    {
                        convert_other: {'int': 'float'}
                    }
    ),
    //TODO... => substitute_call => no *= ?
    ...GenBinaryOperator('floordiv', {
        return_type: {'int': 'int', 'float': 'int'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return r`Math.floor(${binary_jsop(node, a, '/', b, false)})`;
        }
    }),
} satisfies STypeObj;

export default SType_float;