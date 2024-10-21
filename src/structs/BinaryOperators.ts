import { r } from "ast2js";
import { ASTNode } from "./ASTNode";
import { SType_NOT_IMPLEMENTED, STypeFctSubs, STypeObj } from "./SType";

import SType_float from "core_modules/literals/float/stype";
import SType_int from "core_modules/literals/int/stype";
import SType_str from "core_modules/literals/str/stype";
import SType_None from "core_modules/literals/None/stype";
import SType_bool from "core_modules/literals/bool/stype";

export const name2SType = {
    "float"   : SType_float,
    "int"     : SType_int,
    "bool"    : SType_bool,
    "str"     : SType_str,
    "NoneType": SType_None
}
export type STypeName = keyof typeof name2SType;

export const bname2pyname = {
    "USub": "__neg__",
    "Not" : "not",

    "Pow" : "__pow__",

    "Mult"    : "__mul__",
    "Div"     : "__truediv__",
    "FloorDiv": "__floordiv__",
    "Mod"     : "__mod__",

    "Add"     : "__add__",
    "Sub"     : "__sub__",

    "Is"      : "is",
    "IsNot"   : "is not",
    "Eq"      : "__eq__",
    "NotEq"   : "__ne__",

    "Gt"      : "__gt__",
    "GtE"     : "__ge__",
    "Lt"      : "__lt__",
    "LtE"     : "__le__",

    "Invert"  : "__not__",

    "BitOr"   : "__or__",
    "BitXor"  : "__xor__",
    "BitAnd"  : "__and__",
    "RShift"  : "__rshift__",
    "LShift"  : "__lshift__",
}

export const BinaryOperators = {
    '__pow__'     : '__rpow__',
    '__mul__'     : '__rmul__',
    '__truediv__' : '__rtruediv__',
    '__floordiv__': '__rfloordiv__',
    '__mod__'     : '__rmod__',

    '__add__'    : '__radd__',
    '__sub__'    : '__rsub__',

    '__eq__'     : '__eq__',
    '__ne__'     : '__ne__',

    '__lt__'     : '__gt__',
    '__gt__'     : '__lt__',
    '__le__'     : '__ge__',
    '__ge__'     : '__le__',

    '__not__'    : '__rnot__',
    '__or__'     : '__ror__',
    '__and__'    : '__rand__',
    '__xor__'    : '__rxor__',
    '__lshift__' : '__rlshift__',
    '__rshift__' : '__rrshift__',
}

// TODO: unary op too...

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
export const JSOperators = [
    ['u.-'],
    ['**'], // right to left !
    ['*', '/', '%'], // Python also has //
    ['+', '-'],
    ['<<', '>>', '>>>'], //TODO
    ['<', '<=', '>=', '>'],
    ['==', '!=', '===', '!=='],
    ['&'],  //TODO
    ['^'],  //TODO
    ['|'],  //TODO
    ['&&'], //TODO
    ['||', '??'],
    ['='] /* et tous les dérivés */ // right to left !
    // etc.
];


/*
unary
- neg (unary -)
- pos (unary +)

- bool
- float
- int
- str
- repr

- abs
- ceil
- floor
- round
- trunc

binary
- pow/rpow
- divmod/rdivmod
- mod/rmod
- mul/rmul
- floordiv //
- add/radd
- sub/rsub

- lshift/rlshift
- rshift/rrshift
- and/rand
- ne/rne
- or/ror
- xor/rxor
- invert/rinvert

class
- class
- new
- init
- init_subclass

- subclasshook // __isinstancecheck__ 

- dir
- delattr
- setattr
- getattribute

- doc
- format
- getnewargs
- hash
- index (?)
- sizeof
*/

export function Int2Float(a: ASTNode, optional = false) {

    if( a.type === 'literals.int') {
        (a as any).asFloat = true;
        return a;
    }
    if( optional )
        return a;

    return r`Number(${a})`;
}

let JSOperatorsPriority: Record<string, number> = {};
for(let i = 0; i < JSOperators.length; ++i) {

    const priority = JSOperators.length - i;
    for(let op of JSOperators[i])
        JSOperatorsPriority[op] = priority;

}

export function reversed_operator<T extends keyof typeof BinaryOperators>(op: T) {
    return BinaryOperators[op];
}

const LEFT  = 1;
const RIGHT = 2;

export function multi_jsop(node: ASTNode, op: string, ...values: ASTNode[]) {

    const first = values[0];
    if(first instanceof ASTNode) {
        (first as any).parent_op = op;
        (first as any).parent_op_dir = LEFT;
    }

    for(let i = 1; i < values.length-1; ++i) {
        const value = values[i];
        if(value instanceof ASTNode) {
            (value as any).parent_op = op;
            (value as any).parent_op_dir = LEFT|RIGHT;
        }
    }

    const last = values[values.length-1];
    if(last instanceof ASTNode) {
        (last as any).parent_op = op;
        (last as any).parent_op_dir = RIGHT;
    }

    let result = r`${first}`;
    for(let i = 1; i < values.length; ++i)
        result = r`${result} && ${values[i]}`;

    if( "parent_op" in node ) {

        let direction       = (node as any).parent_op_dir;
        let cur_priority    = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op as any];

        if( parent_priority > cur_priority 
            || (parent_priority === cur_priority && (direction & RIGHT) )
        )
            result = r`(${result})`;
    }

    return result;
}

export function binary_jsop(node: ASTNode, a: ASTNode|any, op: string, b: ASTNode|any, check_priority = true) {

    if(a instanceof ASTNode) {
        (a as any).parent_op = op;
        (a as any).parent_op_dir = LEFT;
    }

    if(b instanceof ASTNode) {
        (b as any).parent_op = op;
        (b as any).parent_op_dir = RIGHT;
    }

    let result = r`${a}${op}${b}`;

    if( check_priority && "parent_op" in node ) {

        let direction       = (node as any).parent_op_dir;
        let cur_priority    = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op as any];

        if( parent_priority > cur_priority 
            || (parent_priority === cur_priority && (direction & RIGHT) )
        )
            result = r`(${result})`;
    }

    return result;
}


export function unary_jsop(node: ASTNode, op: string, a: ASTNode|any, check_priority = true) {

    if(a instanceof ASTNode) {
        (a as any).parent_op = op;
        (a as any).parent_op_dir = RIGHT;
    }

    let result = r`${op}${a}`;

    if( check_priority && "parent_op" in node ) {

        let direction       = (node as any).parent_op_dir;
        let cur_priority    = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op as any];

        if( (direction & LEFT) && parent_priority > cur_priority )
            result = r`(${result})`;
    }

    return result;
}

type GenCmpOperator_Opts = {
    supported_types: string[],
};

function _genCmp(op1: string, op2: string) {
    return (node: ASTNode, self: ASTNode, o: ASTNode, invert_dir: boolean, reversed: boolean) => {
        
        let op = op1;
        if( reversed )
            invert_dir = ! invert_dir;
        if( invert_dir )
            op = op2;
        return reversed ? binary_jsop(node, o, op, self) : binary_jsop(node, self, op, o);
    }
}

export function GenCmpOperator({
    supported_types
}: GenCmpOperator_Opts) {

    const return_type = (o: string) => supported_types.includes(o) ? 'bool': SType_NOT_IMPLEMENTED;

    const xt = _genCmp('<' , '>');
    const xe = _genCmp('<=', '>=');

    return {
        __lt__: {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean) => {
                console.warn("lt", self, o, reversed);
                return xt(node, self, o, false, reversed);
            }
        },
        __gt__: {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean) => {
                console.warn("gt", self, o, reversed);
                return xt(node, self, o, true, reversed);
            }
        },
        __le__: {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean) => {
                return xe(node, self, o, false, reversed);
            }
        },
        __ge__: {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean) => {
                return xe(node, self, o, true, reversed);
            }
        }
    }
}

type GenEqOperator_Opts = {
    call_substitute: (node: ASTNode, left: ASTNode, op: "=="|"!=", right: ASTNode, reversed: boolean) => any,
    supported_types: string[],
    convert       ?: (a: ASTNode) => any,
    self_convert  ?: (a: ASTNode) => any,
}

export function GenEqOperator({
    call_substitute,
    supported_types,
    convert = (a: ASTNode) => a,
    self_convert = (a: ASTNode) => a
}: GenEqOperator_Opts) {

    const return_type = (o: string) => supported_types.includes(o) ? 'bool': SType_NOT_IMPLEMENTED;

    return {
        '__eq__': {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean = false) => {
                
                const left  = reversed ? convert(o)         : self_convert(self);
                const right = reversed ? self_convert(self) : convert(o);

                return call_substitute(node, left, '==', right, reversed);
            }
        },
        '__ne__': {
            return_type,
            call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean = false) => {
                
                const left  = reversed ? convert(o)         : self_convert(self);
                const right = reversed ? self_convert(self) : convert(o);

                return call_substitute(node, left, '!=', right, reversed);
            }
        },
    };
}

type GenBinaryOperator_Opts = {
    call_substitute: (node: ASTNode, self: ASTNode, o: ASTNode) => any,
    return_type    : Record<string, string>,
    convert       ?: (a: ASTNode) => any,
    same_order    ?: boolean
}

export function GenBinaryOperator(name: string, {
    call_substitute,
    return_type,
    same_order = false,
    convert = (a: ASTNode) => a
}: GenBinaryOperator_Opts) {

    const fct = (node: ASTNode, self: ASTNode, o: ASTNode) => {
        return call_substitute(node, self, convert(o) );
    };

    const rfct = same_order ? fct : (node: ASTNode, self: ASTNode, o: ASTNode) => {
        return call_substitute(node, convert(o), self);
    };

    return {
        [`__${ name}__`]: {
            return_type: (o: string) => return_type[o] ?? SType_NOT_IMPLEMENTED,
            call_substitute: fct
        },
        [`__r${name}__`]: {
            return_type: (o: string) => return_type[o] ?? SType_NOT_IMPLEMENTED,
            call_substitute: rfct
        },
    };
}