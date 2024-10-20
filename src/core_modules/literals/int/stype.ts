import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, Int2Float } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_int = {
    ...GenBinaryOperator('pow', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '**', b);
        }
    }),
    ...GenBinaryOperator('mul', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '*', b);
        }
    }),
    ...GenBinaryOperator('truediv', {
        return_type: {'int': 'float'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, Int2Float(a), '/', Int2Float(b), false);
        }
    }),
    ...GenBinaryOperator('floordiv', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '/', b);
        }
    }),
    ...GenBinaryOperator('mod', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '%', b);
        }
    }),
    ...GenBinaryOperator('add', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '+', b);
        }
    }),
    ...GenBinaryOperator('sub', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '-', b);
        }
    })
} satisfies STypeObj;

export default SType_int;