export type OP_ID = number; // can't brand it as I will do operations on it...

// have reverse
export const OP_BIT_OR     =  0 as const; // prio 5
export const OP_BIT_XOR    =  1 as const; // prio 6
export const OP_BIT_AND    =  2 as const; // prio 7

export const OP_BIT_LSHIFT =  3 as const; // prio 8
export const OP_BIT_RSHIFT =  4 as const; // prio 8

export const OP_BIN_ADD    =  5 as const; // prio 9
export const OP_BIN_SUB    =  6 as const; // prio 9

export const OP_BIN_MUL    =  7 as const; // prio 10
export const OP_BIN_DIV    =  8 as const; // prio 10
export const OP_BIN_FDIV   =  9 as const; // prio 10
export const OP_BIN_MOD    = 10 as const; // prio 10

export const OP_BIN_POW    = 11 as const; // prio 13

// special reverse (~= self)
export const OP_CMP_EQ     = 12 as const; // prio 4 
export const OP_CMP_NEQ    = 13 as const; // prio 4 
export const OP_CMP_GT     = 14 as const; // prio 4 
export const OP_CMP_GE     = 15 as const; // prio 4 
export const OP_CMP_LT     = 16 as const; // prio 4 
export const OP_CMP_LE     = 17 as const; // prio 4 

// can't be inverted

export const OP_UNR_PLUS   = 18 as const; // prio 11
export const OP_UNR_MINUS  = 19 as const; // prio 12
export const OP_BIT_NOT    = 20 as const; // prio 12

export const OP_CMP_IN     = 21 as const; // prio 4 // __contains__
export const OP_CMP_NOT_IN = 22 as const; // prio 4 // not(__contains__)

// can't be override...
export const OP_CMP_IS     = 23 as const; // prio 4
export const OP_CMP_IS_NOT = 24 as const; // prio 4

export const OP_BOOL_OR    = 25 as const; // prio 1 
export const OP_BOOL_AND   = 26 as const; // prio 2
export const OP_BOOL_NOT   = 27 as const; // prio 3

export const OP_OFF_REVERSE = 28;
export const OP_OOF_IEQ     = 28+12;

export const OP_EQ2IS = OP_CMP_IS - OP_CMP_EQ;

// https://www.w3schools.com/python/python_operators.asp
// the higher the more priority
export const pyop_priorities = [
    5, // OP_BIT_OR
    6, // OP_BIT_XOR
    7, // OP_BIT_AND

    8, // OP_BIT_LSHIFT
    9, // OP_BIT_RSHIFT

    9, // OP_BIN_ADD
    9, // OP_BIN_SUB

    10, // OP_BIN_MUL
    10, // OP_BIN_DIV
    10, // OP_BIN_FDIV
    10, // OP_BIN_MOD

    13, // OP_BIN_POW

    4, // OP_CMP_EQ
    4, // OP_CMP_NEQ
    4, // OP_CMP_GT
    4, // OP_CMP_GE
    4, // OP_CMP_LT
    4, // OP_CMP_LE

    11, // OP_UNR_PLUS
    12, // OP_UNR_MINUS
    13, // OP_BIT_NOT

    4, // OP_CMP_IN
    4, // OP_CMP_NOT_IN

    4, // OP_CMP_IS
    4, // OP_CMP_IS_NOT

    1, // OP_BOOL_OR
    2, // OP_BOOL_AND
    3, // OP_BOOL_NOT
]

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
// the higher the more priority
export const jsop_priorities = [
    5, // OP_BIT_OR
    6, // OP_BIT_XOR
    7, // OP_BIT_AND

    10, // OP_BIT_LSHIFT
    10, // OP_BIT_RSHIFT

    11, // OP_BIN_ADD
    11, // OP_BIN_SUB

    12, // OP_BIN_MUL
    12, // OP_BIN_DIV
    12, // OP_BIN_FDIV
    12, // OP_BIN_MOD

    13, // OP_BIN_POW

    8, // OP_CMP_EQ
    8, // OP_CMP_NEQ
    9, // OP_CMP_GT
    9, // OP_CMP_GE
    9, // OP_CMP_LT
    9, // OP_CMP_LE

    14, // OP_UNR_PLUS
    14, // OP_UNR_MINUS
    14, // OP_BIT_NOT

    9, // OP_CMP_IN
    9, // OP_CMP_NOT_IN

    8, // OP_CMP_IS
    8, // OP_CMP_IS_NOT

    3, // OP_BOOL_OR
    4, // OP_BOOL_AND
    14,// OP_BOOL_NOT
    //TODO: add more op ?
]

export const opid2opmethod = [
    "__or__",
    "__xor__",
    "__and__",
    "__lshift__",
    "__rshift__",
    "__add__",
    "__sub__",
    "__mul__",
    "__truediv__",
    "__floordiv__",
    "__mod__",
    "__pow__",
    "__eq__",
    "__neq__",
    "__gt__",
    "__ge__",
    "__lt__",
    "__le__",
    // can't be inverted
    "__pos__", // unary +
    "__neg__",
    "__not__",
    "__contains__",
    "", // not contains (special)

    // reversed
    "__ror__",
    "__rxor__",
    "__rand__",
    "__rlshift__",
    "__rrshift__",
    "__radd__",
    "__rsub__",
    "__rmul__",
    "__rtruediv__",
    "__rfloordiv__",
    "__rmod__",
    "__rpow__",
    // ieq
    "__ior__",
    "__ixor__",
    "__iand__",
    "__ilshift__",
    "__irshift__",
    "__iadd__",
    "__isub__",
    "__imul__",
    "__itruediv__",
    "__ifloordiv__",
    "__imod__",
    "__ipow__",
];

export const opid2jsop = [
    "|",
    "^",
    "&",
    "<<",
    ">>",
    "+",
    "-",
    "*",
    "/", // might need special fct
    "/", // might need special fct
    "%", // might need special fct
    "**",
    "==",
    "!=",
    ">",
    ">=",
    "<",
    "<=",
    "+",
    "-",
    "~",
    "in",
    //TODO: add more op ?
];

/*
    export const OP_UNR_PLUS   = 18 as const; // prio 11
    export const OP_UNR_MINUS  = 19 as const; // prio 12
    export const OP_BIT_NOT    = 20 as const; // prio 12
    export const OP_BOOL_NOT   = 27 as const; // prio 3
*/

export const opsymbol2opid = {
    "|"     : OP_BIT_OR,
    "^"     : OP_BIT_XOR,
    "&"     : OP_BIT_AND,
    "<<"    : OP_BIT_LSHIFT,
    ">>"    : OP_BIT_RSHIFT,
    "+"     : OP_BIN_ADD,
    "-"     : OP_BIN_SUB,
    "*"     : OP_BIN_MUL,
    "/"     : OP_BIN_DIV,
    "//"    : OP_BIN_FDIV,
    "%"     : OP_BIN_MOD,
    "**"    : OP_BIN_POW,
    "=="    : OP_CMP_EQ,
    "!="    : OP_CMP_NEQ,
    ">"     : OP_CMP_GT,
    ">="    : OP_CMP_GE,
    "<"     : OP_CMP_LT,
    "<="    : OP_CMP_LE,
    "in"    : OP_CMP_IN,
    "not in": OP_CMP_NOT_IN,
    "is"    : OP_CMP_IS,
    "is not": OP_CMP_IS_NOT,
    "or"    : OP_BOOL_OR,
    "and"   : OP_BOOL_AND
}