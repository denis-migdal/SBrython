import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, GenEqOperator, Int2Float, unary_jsop } from "structs/BinaryOperators";
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
    ...GenBinaryOperator('pow', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '**', b);
        }
    }),
    ...GenBinaryOperator('mul', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '*', b);
        }
    }),
    ...GenBinaryOperator('truediv', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '/', b);
        }
    }),
    ...GenBinaryOperator('floordiv', {
        return_type: {'int': 'int', 'float': 'int'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return r`Math.floor(${binary_jsop(node, a, '/', b, false)})`;
        }
    }),
    ...GenBinaryOperator('mod', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '%', b);
        }
    }),
    ...GenBinaryOperator('add', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '+', b);
        }
    }),
    ...GenBinaryOperator('sub', {
        return_type: {'float': 'float', 'int': 'float'},
        convert: (a) => a.result_type === 'int' ? Int2Float(a) : a,
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '-', b);
        }
    }),
} satisfies STypeObj;

export default SType_float;