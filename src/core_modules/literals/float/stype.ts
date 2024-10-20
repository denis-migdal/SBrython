import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, Int2Float } from "structs/BinaryOperators";
import { SType_NOT_IMPLEMENTED, STypeObj } from "structs/SType";

const SType_float = {

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