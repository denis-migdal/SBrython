import LIST from './list';
export default LIST;
export {ast2js} from './utils';

LIST[0  ] = require("./symbol").default;
LIST[1  ] = require("./struct/tuple").default;
LIST[2  ] = require("./struct/list").default;
LIST[3  ] = require("./struct/dict").default;
LIST[4  ] = require("./key/return").default;
LIST[5  ] = require("./key/pass").default;
LIST[6  ] = require("./key/raise").default;
LIST[7  ] = require("./key/import").default;
LIST[8  ] = require("./key/import_alias").default;
LIST[9  ] = require("./key/continue").default;
LIST[10 ] = require("./key/break").default;
LIST[11 ] = require("./key/assert").default;
LIST[12 ] = require("./op/op").default;
LIST[13 ] = require("./op/unary").default;
LIST[14 ] = require("./op/cmp").default;
LIST[15 ] = require("./op/bool").default;
LIST[16 ] = require("./op/bin").default;
LIST[17 ] = require("./op/not").default;
LIST[18 ] = require("./op/attr").default;
LIST[19 ] = require("./op/brackets").default;
LIST[20 ] = require("./op/assign_aug").default;
LIST[21 ] = require("./op/assign_init").default;
LIST[22 ] = require("./op/assign_attr").default;
LIST[23 ] = require("./op/assign").default;
LIST[24 ] = require("./lit/str").default;
LIST[25 ] = require("./lit/int").default;
LIST[26 ] = require("./lit/float").default;
LIST[27 ] = require("./lit/fstring").default;
LIST[28 ] = require("./lit/fstring_fval").default;
LIST[29 ] = require("./lit/true").default;
LIST[30 ] = require("./lit/false").default;
LIST[31 ] = require("./lit/none").default;
LIST[32 ] = require("./def/fct").default;
LIST[33 ] = require("./def/meth").default;
LIST[34 ] = require("./def/args").default;
LIST[35 ] = require("./def/arg_posonly").default;
LIST[36 ] = require("./def/arg_pos").default;
LIST[37 ] = require("./def/arg_varargs").default;
LIST[38 ] = require("./def/arg_kwonly").default;
LIST[39 ] = require("./def/arg_kwargs").default;
LIST[40 ] = require("./call/index").default;
LIST[41 ] = require("./call/arg_kw").default;
LIST[42 ] = require("./ctrl/while").default;
LIST[43 ] = require("./ctrl/tryblock").default;
LIST[44 ] = require("./ctrl/tryblock_catch").default;
LIST[45 ] = require("./ctrl/ternary").default;
LIST[46 ] = require("./ctrl/if").default;
LIST[47 ] = require("./ctrl/elif").default;
LIST[48 ] = require("./ctrl/else").default;
LIST[49 ] = require("./ctrl/for_range").default;
LIST[50 ] = require("./ctrl/for").default;
LIST[51 ] = require("./classdef").default;
LIST[52 ] = require("./body").default;
LIST[53 ] = require("./2bigint").default;
LIST[54 ] = require("./2number").default;
LIST[55 ] = require("./comment").default;

const _id2name = ! __DEBUG__ ? [] : [
	"SYMBOL",
	"STRUCT_TUPLE",
	"STRUCT_LIST",
	"STRUCT_DICT",
	"KEY_RETURN",
	"KEY_PASS",
	"KEY_RAISE",
	"KEY_IMPORT",
	"KEY_IMPORT_ALIAS",
	"KEY_CONTINUE",
	"KEY_BREAK",
	"KEY_ASSERT",
	"OP_OP",
	"OP_UNARY",
	"OP_CMP",
	"OP_BOOL",
	"OP_BIN",
	"OP_NOT",
	"OP_ATTR",
	"OP_BRACKETS",
	"OP_ASSIGN_AUG",
	"OP_ASSIGN_INIT",
	"OP_ASSIGN_ATTR",
	"OP_ASSIGN",
	"LIT_STR",
	"LIT_INT",
	"LIT_FLOAT",
	"LIT_FSTRING",
	"LIT_FSTRING_FVAL",
	"LIT_TRUE",
	"LIT_FALSE",
	"LIT_NONE",
	"DEF_FCT",
	"DEF_METH",
	"DEF_ARGS",
	"DEF_ARG_POSONLY",
	"DEF_ARG_POS",
	"DEF_ARG_VARARGS",
	"DEF_ARG_KWONLY",
	"DEF_ARG_KWARGS",
	"CALL",
	"CALL_ARG_KW",
	"CTRL_WHILE",
	"CTRL_TRYBLOCK",
	"CTRL_TRYBLOCK_CATCH",
	"CTRL_TERNARY",
	"CTRL_IF",
	"CTRL_ELIF",
	"CTRL_ELSE",
	"CTRL_FOR_RANGE",
	"CTRL_FOR",
	"CLASSDEF",
	"BODY",
	"2BIGINT",
	"2NUMBER",
	"COMMENT",
];
export const id2name = _id2name;
