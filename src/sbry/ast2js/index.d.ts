declare const _default: ((node: number) => void)[];
export default _default;

export declare const AST_SYMBOL = 0;
// structures
export declare const AST_STRUCT_TUPLE = 1;
export declare const AST_STRUCT_LIST = 2;
export declare const AST_STRUCT_DICT = 3;
// keywords
export declare const AST_KEY_RETURN = 4;
export declare const AST_KEY_PASS = 5;
export declare const AST_KEY_RAISE = 22;
export declare const AST_KEY_IMPORT = 23;
export declare const AST_KEY_IMPORT_ALIAS = 24;
export declare const AST_KEY_CONTINUE = 25;
export declare const AST_KEY_BREAK = 26;
export declare const AST_KEY_ASSERT = 27;
// operators
export declare const AST_OP_UNARY = 6;
export declare const AST_OP_CMP = 7;
export declare const AST_OP_BOOL = 8;
export declare const AST_OP_BIN = 9;
export declare const AST_OP_ATTR = 10;
export declare const AST_OP_BRACKETS = 11;
export declare const AST_OP_ASSIGN_AUG = 12;
export declare const AST_OP_ASSIGN_INIT = 13;
export declare const AST_OP_ASSIGN_ATTR = 44;
export declare const AST_OP_ASSIGN = 14;
// Litterals
export declare const AST_LIT_STR = 15;
export declare const AST_LIT_INT = 16;
export declare const AST_LIT_FLOAT = 17;
export declare const AST_LIT_FSTRING = 18;
export declare const AST_LIT_FSTRING_FVAL = 19;
export declare const AST_LIT_BOOL = 20;
export declare const AST_LIT_NONE = 21;
// Functions
export declare const AST_FCT_DEF = 28;
export declare const AST_FCT_DEF_METH = 43;
export declare const AST_FCT_DEF_ARGS = 31;
export declare const AST_FCT_CALL = 29;
export declare const AST_FCT_CALL_KEYWORD = 30;
// Controlflows
export declare const AST_CTRL_WHILE = 32;
export declare const AST_CTRL_TRYBLOCK = 33;
export declare const AST_CTRL_TRYBLOCK_CATCH = 34;
export declare const AST_CTRL_TERNARY = 35;
export declare const AST_CTRL_IFBLOCK = 36;
export declare const AST_CTRL_FOR_RANGE = 37;
export declare const AST_CTRL_FOR = 38;
// Others
export declare const AST_CLASSDEF = 39;
export declare const AST_BODY = 40;
export declare const AST_2BIGINT = 41;
export declare const AST_2NUMBER = 42;