import { w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild, setParentOPPrio } from "@SBrython/sbry/dop";

// current
    // astname => pyname (bname2pyname)
    // pyname => r.pyname (BinaryOperators) - adds r except eq/ne/(l/g)(t/e)
    // pyname => a.pyname (AssignOperators) - adds "i"
    // jsname => pyname (jsop2pyop)
// astname => IDX => Py name (?) [needs py name as it is on its SType...]
    // AST Type ID = OP_IDX + CSNTE ?
    // reverse/assign/JS_OP_IDX = IDX + CSNTE ?
    // remove jsname => pyname (use CSNTE + reuse lists).

// current
    // a op b js cmp => b op a js cmp (reverse) [with the operator was reversed]
    // js op => priority (JSOperatorsPriority) ! u.- (for unary -)
// use JSOP_IDX => get reversed + priority + jssymb ?

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

// adds i
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
// bigger = more priority (0 by default).
export const JSOperators = [
    [],
    ['='], /* et tous les dérivés */ // right to left !
    ['||', '??'],
    ['&&'], //TODO
    ['|'],  //TODO
    ['^'],  //TODO
    ['&'],  //TODO
    ['==', '!=', '===', '!=='],
    ['<', '<=', '>=', '>'],
    ['<<', '>>', '>>>'], //TODO
    ['+', '-'],
    ['*', '/', '%'], // Python also has //
    ['**'],          // right to left !
    ['!', '++', '--', '~', 'u.-'],
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


let JSOperatorsPriority: Record<string, number> = {};
for(let i = 0; i < JSOperators.length; ++i) {

    const priority = i;
    for(const op of JSOperators[i])
        JSOperatorsPriority[op] = priority;

}

export const JSOperatorsPrio = JSOperatorsPriority;

export function reversed_operator<T extends keyof typeof BinaryOperators>(op: T) {
    return BinaryOperators[op];
}

const LEFT  = 1;
const RIGHT = 2;

export function write_multi_jsop(node: number, op: string ) {

    const first      = firstChild(node);
    const nbChildren = nbChild(node); 

    const prio   = JSOperatorsPriority[op];
    const p_prio = JSOperatorsPriority[op];

    setParentOPPrio(first, prio);

    for(let i = 1; i < nbChildren; ++i)
        setParentOPPrio( first + i, prio + 1 );

    const parenthesis = p_prio < prio;
    if( parenthesis )
        w_str("(");

    w_node(first);

    for(let i = 1; i < nbChildren; ++i) {
        w_str(' && ');
        w_node(first+1);
    }

    if( parenthesis )
        w_str(")");
}

export const CMPOPS_LIST = ['==', '!=', '>', '<', '>=', '<='] as const;
