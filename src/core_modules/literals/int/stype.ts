import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";

type STypeSubs = {
    type       ?: string,
    substitute ?: (...args: any[]) => any
};
type STypeFctSubs = {
    type       ?: string, // or many types... []
    substitute ?: (...args: any[]) => any,
    return_type : (...args: string[]) => string // for methods/functions...
};
type SType = string | STypeSubs | STypeFctSubs;
type STypeObj = Record<string, SType>;

export const SType_NOT_IMPLEMENTED = "NotImplementedType";

const BinaryOperators = {
    '__add__': '__radd__'
}

export function reversed_operator<T extends keyof typeof BinaryOperators>(op: T) {
    return BinaryOperators[op];
}

export function commutative_operators(type: STypeObj, ...ops:(keyof typeof BinaryOperators)[]) {
    for(let op of ops) {

        const stype_op = type[op];

        const rop = BinaryOperators[op];
        type[rop] = {
            return_type: (a) => (stype_op as STypeFctSubs).return_type(a),
            substitute: (self, o) => (stype_op as STypeFctSubs).substitute!(o, self)
        }
    }
}

function binary_jsop(node: ASTNode, a: ASTNode, op: string, b: ASTNode) {

    (a as any).parent_op = op;
    (b as any).parent_op = op;

    let result = r`${a}${op}${b}`;

    // TODO js op priority order...
    if( "parent_op" in node )
        result = r`(${result})`;

    return result;
}

const SType_int = {
    __add__ :  {
        return_type: (o) => {
            if( o === 'int')
                return 'int';

            return SType_NOT_IMPLEMENTED; // can't be used.
        },
        substitute: (node: ASTNode, self: ASTNode, o: ASTNode) => {
            return binary_jsop(node, self, '+', o);
        }
    }
} satisfies STypeObj;

commutative_operators(SType_int, '__add__');

export default SType_int;