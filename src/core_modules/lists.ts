import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./structs/tuple/astconvert.ts";
import      AST2JS_1 from "./structs/tuple/ast2js.ts";
import AST_CONVERT_2 from "./structs/list/astconvert.ts";
import      AST2JS_2 from "./structs/list/ast2js.ts";
import AST_CONVERT_3 from "./structs/dict/astconvert.ts";
import      AST2JS_3 from "./structs/dict/ast2js.ts";
import AST_CONVERT_4 from "./return/astconvert.ts";
import      AST2JS_4 from "./return/ast2js.ts";
import AST_CONVERT_5 from "./pass/astconvert.ts";
import      AST2JS_5 from "./pass/ast2js.ts";
import AST_CONVERT_6 from "./operators/unary/astconvert.ts";
import      AST2JS_6 from "./operators/unary/ast2js.ts";
import AST_CONVERT_7 from "./operators/compare/astconvert.ts";
import      AST2JS_7 from "./operators/compare/ast2js.ts";
import AST_CONVERT_8 from "./operators/boolean/astconvert.ts";
import      AST2JS_8 from "./operators/boolean/ast2js.ts";
import AST_CONVERT_9 from "./operators/binary/astconvert.ts";
import      AST2JS_9 from "./operators/binary/ast2js.ts";
import     RUNTIME_9 from "./operators/binary/runtime.ts";
import AST_CONVERT_10 from "./operators/attr/astconvert.ts";
import      AST2JS_10 from "./operators/attr/ast2js.ts";
import AST_CONVERT_11 from "./operators/[]/astconvert.ts";
import      AST2JS_11 from "./operators/[]/ast2js.ts";
import AST_CONVERT_12 from "./operators/AssignOp/astconvert.ts";
import      AST2JS_12 from "./operators/AssignOp/ast2js.ts";
import AST_CONVERT_13 from "./operators/=_init/astconvert.ts";
import      AST2JS_13 from "./operators/=_init/ast2js.ts";
import AST_CONVERT_14 from "./operators/=/astconvert.ts";
import      AST2JS_14 from "./operators/=/ast2js.ts";
import AST_CONVERT_15 from "./literals/str/astconvert.ts";
import      AST2JS_15 from "./literals/str/ast2js.ts";
import AST_CONVERT_16 from "./literals/int/astconvert.ts";
import      AST2JS_16 from "./literals/int/ast2js.ts";
import AST_CONVERT_17 from "./literals/float/astconvert.ts";
import      AST2JS_17 from "./literals/float/ast2js.ts";
import     RUNTIME_17 from "./literals/float/runtime.ts";
import AST_CONVERT_18 from "./literals/f-string/astconvert.ts";
import      AST2JS_18 from "./literals/f-string/ast2js.ts";
import AST_CONVERT_19 from "./literals/f-string/FormattedValue/astconvert.ts";
import      AST2JS_19 from "./literals/f-string/FormattedValue/ast2js.ts";
import AST_CONVERT_20 from "./literals/bool/astconvert.ts";
import      AST2JS_20 from "./literals/bool/ast2js.ts";
import AST_CONVERT_21 from "./literals/None/astconvert.ts";
import      AST2JS_21 from "./literals/None/ast2js.ts";
import AST_CONVERT_22 from "./keywords/raise/astconvert.ts";
import      AST2JS_22 from "./keywords/raise/ast2js.ts";
import     RUNTIME_22 from "./keywords/raise/runtime.ts";
import AST_CONVERT_23 from "./keywords/import/astconvert.ts";
import      AST2JS_23 from "./keywords/import/ast2js.ts";
import AST_CONVERT_24 from "./keywords/import/alias/astconvert.ts";
import      AST2JS_24 from "./keywords/import/alias/ast2js.ts";
import AST_CONVERT_25 from "./keywords/continue/astconvert.ts";
import      AST2JS_25 from "./keywords/continue/ast2js.ts";
import AST_CONVERT_26 from "./keywords/break/astconvert.ts";
import      AST2JS_26 from "./keywords/break/ast2js.ts";
import AST_CONVERT_27 from "./keywords/assert/astconvert.ts";
import      AST2JS_27 from "./keywords/assert/ast2js.ts";
import     RUNTIME_27 from "./keywords/assert/runtime.ts";
import AST_CONVERT_28 from "./functions/def/astconvert.ts";
import      AST2JS_28 from "./functions/def/ast2js.ts";
import AST_CONVERT_29 from "./functions/call/astconvert.ts";
import      AST2JS_29 from "./functions/call/ast2js.ts";
import AST_CONVERT_30 from "./functions/call/keyword/astconvert.ts";
import      AST2JS_30 from "./functions/call/keyword/ast2js.ts";
import AST_CONVERT_31 from "./functions/args/astconvert.ts";
import      AST2JS_31 from "./functions/args/ast2js.ts";
import AST_CONVERT_32 from "./controlflows/while/astconvert.ts";
import      AST2JS_32 from "./controlflows/while/ast2js.ts";
import AST_CONVERT_33 from "./controlflows/tryblock/astconvert.ts";
import      AST2JS_33 from "./controlflows/tryblock/ast2js.ts";
import     RUNTIME_33 from "./controlflows/tryblock/runtime.ts";
import AST_CONVERT_34 from "./controlflows/tryblock/catch/astconvert.ts";
import      AST2JS_34 from "./controlflows/tryblock/catch/ast2js.ts";
import AST_CONVERT_35 from "./controlflows/ternary/astconvert.ts";
import      AST2JS_35 from "./controlflows/ternary/ast2js.ts";
import AST_CONVERT_36 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_36 from "./controlflows/ifblock/ast2js.ts";
import AST_CONVERT_37 from "./controlflows/for_range/astconvert.ts";
import      AST2JS_37 from "./controlflows/for_range/ast2js.ts";
import AST_CONVERT_38 from "./controlflows/for/astconvert.ts";
import      AST2JS_38 from "./controlflows/for/ast2js.ts";
import AST_CONVERT_39 from "./class/classdef/astconvert.ts";
import      AST2JS_39 from "./class/classdef/ast2js.ts";
import AST_CONVERT_40 from "./body/astconvert.ts";
import      AST2JS_40 from "./body/ast2js.ts";


export const SYMBOL = 0;
export const STRUCTS_TUPLE = 1;
export const STRUCTS_LIST = 2;
export const STRUCTS_DICT = 3;
export const RETURN = 4;
export const PASS = 5;
export const OPERATORS_UNARY = 6;
export const OPERATORS_COMPARE = 7;
export const OPERATORS_BOOLEAN = 8;
export const OPERATORS_BINARY = 9;
export const OPERATORS_ATTR = 10;
export const OPERATORS__BRACKETS = 11;
export const OPERATORS_ASSIGNOP = 12;
export const OPERATORS__EQ_INIT = 13;
export const OPERATORS__EQ = 14;
export const LITERALS_STR = 15;
export const LITERALS_INT = 16;
export const LITERALS_FLOAT = 17;
export const LITERALS_F_STRING = 18;
export const LITERALS_F_STRING_FORMATTEDVALUE = 19;
export const LITERALS_BOOL = 20;
export const LITERALS_NONE = 21;
export const KEYWORDS_RAISE = 22;
export const KEYWORDS_IMPORT = 23;
export const KEYWORDS_IMPORT_ALIAS = 24;
export const KEYWORDS_CONTINUE = 25;
export const KEYWORDS_BREAK = 26;
export const KEYWORDS_ASSERT = 27;
export const FUNCTIONS_DEF = 28;
export const FUNCTIONS_CALL = 29;
export const FUNCTIONS_CALL_KEYWORD = 30;
export const FUNCTIONS_ARGS = 31;
export const CONTROLFLOWS_WHILE = 32;
export const CONTROLFLOWS_TRYBLOCK = 33;
export const CONTROLFLOWS_TRYBLOCK_CATCH = 34;
export const CONTROLFLOWS_TERNARY = 35;
export const CONTROLFLOWS_IFBLOCK = 36;
export const CONTROLFLOWS_FOR_RANGE = 37;
export const CONTROLFLOWS_FOR = 38;
export const CLASS_CLASSDEF = 39;
export const BODY = 40;

export const AST_CONVERT = [
	AST_CONVERT_0,
	AST_CONVERT_1,
	AST_CONVERT_2,
	AST_CONVERT_3,
	AST_CONVERT_4,
	AST_CONVERT_5,
	AST_CONVERT_6,
	AST_CONVERT_7,
	AST_CONVERT_8,
	AST_CONVERT_9,
	AST_CONVERT_10,
	AST_CONVERT_11,
	AST_CONVERT_12,
	AST_CONVERT_13,
	AST_CONVERT_14,
	AST_CONVERT_15,
	AST_CONVERT_16,
	AST_CONVERT_17,
	AST_CONVERT_18,
	AST_CONVERT_19,
	AST_CONVERT_20,
	AST_CONVERT_21,
	AST_CONVERT_22,
	AST_CONVERT_23,
	AST_CONVERT_24,
	AST_CONVERT_25,
	AST_CONVERT_26,
	AST_CONVERT_27,
	AST_CONVERT_28,
	AST_CONVERT_29,
	AST_CONVERT_30,
	AST_CONVERT_31,
	AST_CONVERT_32,
	AST_CONVERT_33,
	AST_CONVERT_34,
	AST_CONVERT_35,
	AST_CONVERT_36,
	AST_CONVERT_37,
	AST_CONVERT_38,
	AST_CONVERT_39,
	AST_CONVERT_40,
]

export const AST2JS = [
	AST2JS_0,
	AST2JS_1,
	AST2JS_2,
	AST2JS_3,
	AST2JS_4,
	AST2JS_5,
	AST2JS_6,
	AST2JS_7,
	AST2JS_8,
	AST2JS_9,
	AST2JS_10,
	AST2JS_11,
	AST2JS_12,
	AST2JS_13,
	AST2JS_14,
	AST2JS_15,
	AST2JS_16,
	AST2JS_17,
	AST2JS_18,
	AST2JS_19,
	AST2JS_20,
	AST2JS_21,
	AST2JS_22,
	AST2JS_23,
	AST2JS_24,
	AST2JS_25,
	AST2JS_26,
	AST2JS_27,
	AST2JS_28,
	AST2JS_29,
	AST2JS_30,
	AST2JS_31,
	AST2JS_32,
	AST2JS_33,
	AST2JS_34,
	AST2JS_35,
	AST2JS_36,
	AST2JS_37,
	AST2JS_38,
	AST2JS_39,
	AST2JS_40,
]

const RUNTIME = {};
Object.assign(RUNTIME, RUNTIME_9);
Object.assign(RUNTIME, RUNTIME_17);
Object.assign(RUNTIME, RUNTIME_22);
Object.assign(RUNTIME, RUNTIME_27);
Object.assign(RUNTIME, RUNTIME_33);


export const _b_ = RUNTIME;
