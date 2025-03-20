export const AST_SYMBOL = 0;
// structures
export const AST_STRUCT_TUPLE = 1;
export const AST_STRUCT_LIST = 2;
export const AST_STRUCT_DICT = 3;
// keywords
export const AST_KEY_RETURN = 4;
export const AST_KEY_PASS = 5;
export const AST_KEY_RAISE = 22;
export const AST_KEY_IMPORT = 23;
export const AST_KEY_IMPORT_ALIAS = 24;
export const AST_KEY_CONTINUE = 25;
export const AST_KEY_BREAK = 26;
export const AST_KEY_ASSERT = 27;
// operators
export const AST_OP_UNARY = 6;
export const AST_OP_CMP = 7;
export const AST_OP_BOOL = 8;
export const AST_OP_BIN = 9;
export const AST_OP_ATTR = 10;
export const AST_OP_BRACKETS = 11;
export const AST_OP_ASSIGN_AUG = 12;
export const AST_OP_ASSIGN_INIT = 13;
export const AST_OP_ASSIGN_ATTR = 44;
export const AST_OP_ASSIGN = 14;
// Litterals
export const AST_LIT_STR = 15;
export const AST_LIT_INT = 16;
export const AST_LIT_FLOAT = 17;
export const AST_LIT_FSTRING = 18;
export const AST_LIT_FSTRING_FVAL = 19;
export const AST_LIT_BOOL = 20;
export const AST_LIT_NONE = 21;
// Functions
export const AST_FCT_DEF = 28;
export const AST_FCT_DEF_METH = 43;
export const AST_FCT_DEF_ARGS = 31;
export const AST_FCT_CALL = 29;
export const AST_FCT_CALL_KEYWORD = 30;
// Controlflows
export const AST_CTRL_WHILE = 32;
export const AST_CTRL_TRYBLOCK = 33;
export const AST_CTRL_TRYBLOCK_CATCH = 34;
export const AST_CTRL_TERNARY = 35;
export const AST_CTRL_IFBLOCK = 36;
export const AST_CTRL_FOR_RANGE = 37;
export const AST_CTRL_FOR = 38;
// Others
export const AST_CLASSDEF = 39;
export const AST_BODY = 40;
export const AST_2BIGINT = 41;
export const AST_2NUMBER = 42;

export default [];