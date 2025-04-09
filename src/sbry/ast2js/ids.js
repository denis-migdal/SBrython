// needs to be JS compatible

let last_id = 0;

export const AST_SYMBOL             = last_id++;
// structures
export const AST_STRUCT_TUPLE       = last_id++;
export const AST_STRUCT_LIST        = last_id++;
export const AST_STRUCT_DICT        = last_id++;
// keywords
export const AST_KEY_RETURN         = last_id++;
export const AST_KEY_PASS           = last_id++;
export const AST_KEY_RAISE          = last_id++;
export const AST_KEY_IMPORT         = last_id++;
export const AST_KEY_IMPORT_ALIAS   = last_id++;
export const AST_KEY_CONTINUE       = last_id++;
export const AST_KEY_BREAK          = last_id++;
export const AST_KEY_ASSERT         = last_id++;
// operators
export const AST_OP_UNARY           = last_id++;
export const AST_OP_CMP             = last_id++;
export const AST_OP_BOOL            = last_id++;
export const AST_OP_BIN             = last_id++;
export const AST_OP_ATTR            = last_id++;
export const AST_OP_BRACKETS        = last_id++;
export const AST_OP_ASSIGN_AUG      = last_id++;
export const AST_OP_ASSIGN_INIT     = last_id++;
export const AST_OP_ASSIGN_ATTR     = last_id++;
export const AST_OP_ASSIGN          = last_id++;
// Litterals
export const AST_LIT_STR            = last_id++;
export const AST_LIT_INT            = last_id++;
export const AST_LIT_FLOAT          = last_id++;
export const AST_LIT_FSTRING        = last_id++;
export const AST_LIT_FSTRING_FVAL   = last_id++;
export const AST_LIT_TRUE           = last_id++;
export const AST_LIT_FALSE          = last_id++;
export const AST_LIT_NONE           = last_id++;
// Functions
export const AST_FCT_DEF            = last_id++;
export const AST_FCT_DEF_METH       = last_id++;
export const AST_FCT_DEF_ARGS       = last_id++;
export const AST_FCT_CALL           = last_id++;
export const AST_FCT_CALL_KEYWORD   = last_id++;
// Controlflows
export const AST_CTRL_WHILE         = last_id++;
export const AST_CTRL_TRYBLOCK      = last_id++;
export const AST_CTRL_TRYBLOCK_CATCH= last_id++;
export const AST_CTRL_TERNARY       = last_id++;
export const AST_CTRL_IF            = last_id++;
export const AST_CTRL_ELIF          = last_id++;
export const AST_CTRL_ELSE          = last_id++;
export const AST_CTRL_FOR_RANGE     = last_id++;
export const AST_CTRL_FOR           = last_id++;
// Others
export const AST_CLASSDEF           = last_id++;
export const AST_BODY               = last_id++;
export const AST_2BIGINT            = last_id++;
export const AST_2NUMBER            = last_id++;