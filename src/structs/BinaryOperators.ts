import { r } from "ast2js";
import { ASTNode } from "./ASTNode";
import { SType_NOT_IMPLEMENTED, STypeFctSubs, STypeObj } from "./SType";

export const BinaryOperators = {
    '__pow__'     : '__rpow__',
    '__mul__'     : '__rmul__',
    '__truediv__' : '__rtruediv__',
    '__floordiv__': '__rfloordiv__',
    '__mod__'     : '__rmod__',

    '__add__'    : '__radd__',
    '__sub__'    : '__rsub__',
}

// TODO: unary op too...

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
export const JSBinaryOperators = [
    ['**'], // right to left !
    ['*', '/', '%'], // Python also has //
    ['+', '-'],

    //TODO:
    ['<<', '>>', '>>>'],
    ['<', '<=', '>=', '>'],
    ['==', '!=', '===', '!=='],
    ['&'],
    ['^'],
    ['|'],
    ['&&'],
    ['||', '??'],
    ['='] /* et tous les dérivés */ // right to left !
    // etc.
];


/*
1.__abs__()           1.__init__(           1.__rfloordiv__(
1.__add__(            1.__init_subclass__(  1.__rlshift__(
1.__and__(            1.__int__()           1.__rmod__(
1.__bool__()          1.__invert__()        1.__rmul__(
1.__ceil__(           1.__le__(             1.__ror__(
1.__class__(          1.__lshift__(         1.__round__(
1.__delattr__(        1.__lt__(             1.__rpow__(
1.__dir__()           1.__mod__(            1.__rrshift__(
1.__divmod__(         1.__mul__(            1.__rshift__(
1.__doc__             1.__ne__(             1.__rsub__(
1.__eq__(             1.__neg__()           1.__rtruediv__(
1.__float__()         1.__new__(            1.__rxor__(<-
1.__floor__(          1.__or__(             1.__setattr__(
1.__floordiv__(       1.__pos__()           1.__sizeof__()
1.__format__(         1.__pow__(            1.__str__()
1.__ge__(           ->1.__radd__(           1.__sub__(
1.__getattribute__(   1.__rand__(           1.__subclasshook__(
1.__getnewargs__()    1.__rdivmod__(        1.__truediv__(
1.__gt__(             1.__reduce__()        1.__trunc__(
1.__hash__()          1.__reduce_ex__(      1.__xor__(
1.__index__()         1.__repr__()          

*/

export function Int2Float(a: ASTNode) {

    if( a.type === 'literals.int') {
        (a as any).asFloat = true;
        return a;
    }

    return r`Number(${a})`;
}

let JSBinaryOperatorsPriority: Record<string, number> = {};
for(let i = 0; i < JSBinaryOperators.length; ++i) {

    const priority = JSBinaryOperators.length - i;
    for(let op of JSBinaryOperators[i])
        JSBinaryOperatorsPriority[op] = priority;

}

export function reversed_operator<T extends keyof typeof BinaryOperators>(op: T) {
    return BinaryOperators[op];
}

export function binary_jsop(node: ASTNode, a: ASTNode|any, op: string, b: ASTNode|any, check_priority = true) {

    if(a instanceof ASTNode) {
        (a as any).parent_op = op;
        (a as any).parent_op_dir = 'left';
    }

    if(b instanceof ASTNode) {
        (b as any).parent_op = op;
        (b as any).parent_op_dir = 'right';
    }

    let result = r`${a}${op}${b}`;

    // TODO js op priority order...
    if( check_priority && "parent_op" in node ) {

        let direction       = (node as any).parent_op_dir;
        let cur_priority    = JSBinaryOperatorsPriority[op];
        let parent_priority = JSBinaryOperatorsPriority[node.parent_op as any];

        if( parent_priority > cur_priority 
            || (parent_priority === cur_priority && direction === 'right' )
        )
            result = r`(${result})`;
    }

    return result;
}
type GenBinaryOperator_Opts = {
    call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode) => any,
    return_type    : Record<string, string>,
    convert       ?: (a: ASTNode) => any
}

export function GenBinaryOperator(name: string, {
    call_substitute,
    return_type,
    convert = (a: ASTNode) => a
}: GenBinaryOperator_Opts) {

    return {
        [`__${ name}__`]: {
            return_type: (o: string) => return_type[o] ?? SType_NOT_IMPLEMENTED,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode) => {
                //TODO conversion
                return call_substitute(node, self, convert(o) );
            }
        },
        [`__r${name}__`]: {
            return_type: (o: string) => return_type[o] ?? SType_NOT_IMPLEMENTED,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode) => {
                //TODO conversion
                return call_substitute(node, convert(o), self);
            }
        },
    };
}