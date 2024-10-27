import { r } from "ast2js";
import { ASTNode } from "./ASTNode";
import { SType_NOT_IMPLEMENTED, STypeFctSubs } from "./SType";
import { AST } from "py2ast";

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

export const AssignOperators = {
    '__pow__'     : '__ipow__',
    '__mul__'     : '__imul__',
    '__truediv__' : '__itruediv__',
    '__floordiv__': '__ifloordiv__',
    '__mod__'     : '__imod__',

    '__add__'    : '__iadd__',
    '__sub__'    : '__isub__',

    '__or__'     : '__ior__',
    '__and__'    : '__iand__',
    '__xor__'    : '__ixor__',
    '__lshift__' : '__ilshift__',
    '__rshift__' : '__irshift__',
}


export const jsop2pyop = {
    '**': 'pow',
    '*' : 'mul',
    '/' : 'truediv',
    '//': 'floordiv',
    '%' : 'mod',
    
    '+'  : 'add',
    '-'  : 'sub',
    'u.-': 'neg',

    '==' : 'eq',
    '!=' : 'ne',
    '<'  : 'lt',
    '<=' : 'le',
    '>=' : 'ge',
    '>'  : 'gt',

    '~' : 'not',
    '|' : 'or',
    '&' : 'and',
    '^' : 'xor',
    '<<': 'lshift',
    '>>': 'rshift'
};

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
https://docs.python.org/3/library/functions.html#callable

-> classes
bool()
float()
int()
str()
bytearray() [Uint8Array] (RW)
bytes()     [?]          (RO) <- no types in JS...
                              <- Uint8Array with flag ? freeze() [JS unsafe]
            b"e\xFF" instead of [101,101], etc. (32 <= byt <= 126)
type()
list()      [Array]
tuple()     [Object.frozen(Array)]

set()       // relies on hash()... => set[literals]
                            => set() / <- JS set.
                       => bytes/bytearray/etc.
                            => inherit Set()
                                => Internal keys() set [recompute hash when add/remove]
                                  or
                                => internally stored as Map(hash, value) (?)
frozenset()            => extends set to replace modifiers.

dict()
                        dict[str] as Object.create(null) + (and pure JSObj as dict[str] )
                        => inherit Map()
                            => Set(hash) / Map(hash, key) / Map(key, hash) ???
                                // get/set.
                            => Map(key, value)

object()
complex()
memoryview()            => ArrayBuffer ?

-> print
ascii()
bin()
hex()
oct()
repr()
hash()

-> maths
abs()
divmod()
pow()
round()

-> lists
all()
any()
filter()
map()
max()
min()
sum()
len()
enumerate()
reversed()
slice()
sorted()
zip()

-> iter
range()
aiter()
iter()
anext()
next()

-> str
ord()
chr()
format()
print()
f""

callable()
classmethod()
staticmethod()
property()
super()
isinstance()
issubclass()
delattr()
getattr()
hasattr()
setattr()
dir()

eval()
exec()
compile()
breakpoint()

globals()
locals()
vars()
__import__()

id()
    -> on-demand weakref ?

help()
input()
open()

*/

/*
unary
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


export function Int2Number(a: ASTNode, target = "float") {

    if( a.result_type === 'jsint')
        return a;

    if( a.type === 'literals.int') {
        (a as any).as = target;
        return a;
    }
    if( a.value === '__mul__' || a.value === '__rmul__' ) {
        const ltype = a.children[0].result_type;
        const rtype = a.children[1].result_type;
        if(    (ltype === 'int' || ltype === 'jsint')
            && (rtype === 'int' || rtype === 'jsint')
        ) {
            (a as any).as = target;
            return a;
        }
    }
    if( a.value === '__neg__' && a.children[0].result_type === 'int') {
        (a as any).as = target;
        return a;
    }
    if( target === "float" )
        return r`Number(${a})`;

    // int -> jsint cast is facultative...
    return a;
}

export function Number2Int(a: ASTNode) {

    if( a.result_type === 'int')
        return a;

    if( a.type === 'literals.int') {
        (a as any).as = 'int';
        return a;
    }
    if( a.value === '__neg__' && a.children[0].result_type === 'jsint') {
        (a as any).as = "int";
        return a;
    }

    return r`BigInt(${a})`;
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

export function id_jsop(node: ASTNode, a: ASTNode) {
    if(a instanceof ASTNode) {
        (a as any).parent_op     = (node as any).parent_op;
        (a as any).parent_op_dir = (node as any).parent_op_dir;
    }

    return r`${a}`;
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

    let result = r`${op}${a}`;

    if(op === '-')
        op = 'u.-';

    if(a instanceof ASTNode) {
        (a as any).parent_op = op;
        (a as any).parent_op_dir = RIGHT;
    }


    if( check_priority && "parent_op" in node ) {

        let direction       = (node as any).parent_op_dir;
        let cur_priority    = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op as any];

        if( (direction & LEFT) && parent_priority > cur_priority )
            result = r`(${result})`;
    }

    return result;
}



type GenUnaryOps_Opts = {
    convert_self   ?: (s: any) => any,
    call_substitute?: (node: ASTNode, a: ASTNode) => any
};


export function genUnaryOps(ret_type  : string,
                            ops       : (keyof typeof jsop2pyop)[],
                            {
                                convert_self = (a) => a,
                                call_substitute
                            }: GenUnaryOps_Opts = {}
                        ) {

    let result: Record<string, STypeFctSubs> = {};

    const return_type = (o: string) => ret_type;

    for(let op of ops) {

        const pyop = jsop2pyop[op];
        if( op === 'u.-')
            op = '-';

        call_substitute ??= (node: ASTNode, self: ASTNode) => {
            return unary_jsop(node, op, convert_self(self) );
        };

        result[`__${pyop}__`] = {
            return_type,
            call_substitute
        };
    }
    
    return result;
}

type GenBinaryOps_Opts = {
    convert_other   ?: Record<string, string>,
    convert_self    ?: (s: any) => any,
    call_substitute ?: (node: ASTNode, self: ASTNode|any, other: ASTNode|any) => any
};


function generateConvert(convert: Record<string, string>) {
    return (node: ASTNode) => {
        const src    = node.result_type!;
        const target = convert[src];
        if( target === undefined )
            return node;

        //TODO: improve:
        if( src === "int")
            return Int2Number(node, target);
        if( target === "int" )
            return Number2Int(node);

        throw new Error("Unfound conversion");
    };
}

const idFct = <T>(a: T) => a;

export function genBinaryOps(ret_type: string,
                            ops: (keyof typeof jsop2pyop)[],
                            other_type: string[], 
                         {
                            convert_other   = {},
                            convert_self    = idFct,
                            call_substitute,
                         }: GenBinaryOps_Opts = {}) {

    let result: Record<string, STypeFctSubs> = {};

    const return_type = (o: string) => other_type.includes(o) ? ret_type : SType_NOT_IMPLEMENTED;
    const conv_other  = generateConvert(convert_other);

    for(let op of ops) {

        const pyop = jsop2pyop[op];
        if( op === '//')
            op = '/';

        let cs  = (node: ASTNode, self: ASTNode, other: ASTNode) => {
            return binary_jsop(node, convert_self(self), op, conv_other(other) );
        }

        let rcs = (node: ASTNode, self: ASTNode, other: ASTNode) => {
            return binary_jsop(node, conv_other(other), op, convert_self(self) );
        }

        if( call_substitute !== undefined ) {

            cs  = (node: ASTNode, self: ASTNode, o: ASTNode) => {
                return call_substitute(node, convert_self(self), conv_other(o) );
            };
        
            // same_order ? fct : 
            rcs = (node: ASTNode, self: ASTNode, o: ASTNode) => {
                return call_substitute(node, conv_other(o), convert_self(self) );
            };
        }

        result[`__${pyop}__`] = {
            return_type,
            call_substitute: cs,
        };
        result[`__r${pyop}__`] = {
            return_type,
            call_substitute: rcs,
        };
        if( convert_self === idFct && call_substitute === undefined)
            result[`__i${pyop}__`] = {
                return_type,
                call_substitute: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                    
                    if( op === '+' && other.value === 1)
                        return unary_jsop(node, '++', self);
                    if( op === '-' && other.value === 1)
                        return unary_jsop(node, '--', self);
                    
                    return binary_jsop(node, self, op+'=', conv_other(other) );
                },
            };
    }
    
    return result;
}

export const CMPOPS_LIST = ['==', '!=', '>', '<', '>=', '<='] as const;

const reverse = {
    "==": "==",
    "!=": "!=",
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">=",
}

export function genCmpOps(  ops       : readonly (keyof typeof jsop2pyop)[],
                            other_type: readonly string[],
                            {
                                convert_other   = {},
                                convert_self    = idFct,
                                call_substitute,
                             }: GenBinaryOps_Opts = {} ) {

    let result: Record<string, STypeFctSubs> = {};

    const return_type = (o: string) => other_type.includes(o) ? "bool" : SType_NOT_IMPLEMENTED;
    const conv_other  = generateConvert(convert_other);

    for(let op of ops) {

        const pyop = jsop2pyop[op];

        let cs  = (node: ASTNode, self: ASTNode, other: ASTNode, reversed: boolean) => {

            let cop = op;

            let a = convert_self(self);
            let b = conv_other(other);
            if( reversed ) {
                [a,b] = [b,a];
                cop = reverse[cop];
            }

            if( cop[0] === '=' || cop[0] === '!' ) {
                if( self.result_type === other.result_type)
                    cop = cop + '=';
            }

            return binary_jsop(node, a, cop, b);
        }

        if( call_substitute !== undefined ) {

            cs  = (node: ASTNode, self: ASTNode, o: ASTNode, reversed: boolean) => {
                return call_substitute(node, convert_self(self), conv_other(o) ); //TODO...
            };
        }

        result[`__${pyop}__`] = {
            return_type,
            call_substitute: cs,
        };
    }
    
    return result;
}