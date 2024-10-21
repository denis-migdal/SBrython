import { ASTNode } from "structs/ASTNode";
import { binary_jsop, GenBinaryOperator, GenEqOperator, Int2Float, unary_jsop } from "structs/BinaryOperators";
import { SType_NOT_IMPLEMENTED, STypeObj } from "structs/SType";

const SType_int = {

    ...GenEqOperator({
        supported_types: ["int", "float", "bool"],
        convert     : (a) => Int2Float(a, true),
        self_convert: (a) => Int2Float(a, true),
        call_substitute(node, left, op, right) {
            return binary_jsop(node, left, op, right);
        },
    }),
    "__neg__": {
        return_type: () => 'int',
        call_substitute: (node: ASTNode, a: ASTNode) => {
            return unary_jsop(node, '-', a);
        }
    },
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
    }),
    __not__: {
        return_type: () => 'int',
        call_substitute: (node: ASTNode, a: ASTNode) => unary_jsop(node, '~', a)
    },
    ...GenBinaryOperator('or', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '|', b);
        }
    }),
    ...GenBinaryOperator('xor', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '^', b);
        }
    }),
    ...GenBinaryOperator('and', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '&', b);
        }
    }),
    ...GenBinaryOperator('lshift', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '<<', b);
        }
    }),
    ...GenBinaryOperator('rshift', {
        return_type: {'int': 'int'},
        call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
            return binary_jsop(node, a, '>>', b);
        }
    })
} satisfies STypeObj;

export default SType_int;