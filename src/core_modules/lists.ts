import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./structs/tuple/astconvert.ts";
import      AST2JS_1 from "./structs/tuple/ast2js.ts";
import AST_CONVERT_2 from "./structs/list/astconvert.ts";
import      AST2JS_2 from "./structs/list/ast2js.ts";
import AST_CONVERT_3 from "./return/astconvert.ts";
import      AST2JS_3 from "./return/ast2js.ts";
import AST_CONVERT_4 from "./pass/astconvert.ts";
import      AST2JS_4 from "./pass/ast2js.ts";
import AST_CONVERT_5 from "./operators/attr/astconvert.ts";
import      AST2JS_5 from "./operators/attr/ast2js.ts";
import AST_CONVERT_6 from "./operators/[]/astconvert.ts";
import      AST2JS_6 from "./operators/[]/ast2js.ts";
import AST_CONVERT_7 from "./operators/==/astconvert.ts";
import      AST2JS_7 from "./operators/==/ast2js.ts";
import AST_CONVERT_8 from "./operators/=/astconvert.ts";
import      AST2JS_8 from "./operators/=/ast2js.ts";
import AST_CONVERT_9 from "./operators/+/astconvert.ts";
import      AST2JS_9 from "./operators/+/ast2js.ts";
import AST_CONVERT_10 from "./literals/str/astconvert.ts";
import      AST2JS_10 from "./literals/str/ast2js.ts";
import AST_CONVERT_11 from "./literals/int/astconvert.ts";
import      AST2JS_11 from "./literals/int/ast2js.ts";
import AST_CONVERT_12 from "./literals/float/astconvert.ts";
import      AST2JS_12 from "./literals/float/ast2js.ts";
import AST_CONVERT_13 from "./literals/f-string/astconvert.ts";
import      AST2JS_13 from "./literals/f-string/ast2js.ts";
import AST_CONVERT_14 from "./literals/f-string/FormattedValue/astconvert.ts";
import      AST2JS_14 from "./literals/f-string/FormattedValue/ast2js.ts";
import AST_CONVERT_15 from "./literals/bool/astconvert.ts";
import      AST2JS_15 from "./literals/bool/ast2js.ts";
import AST_CONVERT_16 from "./literals/None/astconvert.ts";
import      AST2JS_16 from "./literals/None/ast2js.ts";
import AST_CONVERT_17 from "./keywords/raise/astconvert.ts";
import      AST2JS_17 from "./keywords/raise/ast2js.ts";
import     RUNTIME_17 from "./keywords/raise/runtime.ts";
import AST_CONVERT_18 from "./keywords/import/astconvert.ts";
import      AST2JS_18 from "./keywords/import/ast2js.ts";
import AST_CONVERT_19 from "./keywords/import/alias/astconvert.ts";
import      AST2JS_19 from "./keywords/import/alias/ast2js.ts";
import AST_CONVERT_20 from "./functions/def/astconvert.ts";
import      AST2JS_20 from "./functions/def/ast2js.ts";
import AST_CONVERT_21 from "./functions/call/astconvert.ts";
import      AST2JS_21 from "./functions/call/ast2js.ts";
import AST_CONVERT_22 from "./controlflows/while/astconvert.ts";
import      AST2JS_22 from "./controlflows/while/ast2js.ts";
import AST_CONVERT_23 from "./controlflows/tryblock/astconvert.ts";
import      AST2JS_23 from "./controlflows/tryblock/ast2js.ts";
import     RUNTIME_23 from "./controlflows/tryblock/runtime.ts";
import AST_CONVERT_24 from "./controlflows/tryblock/try/astconvert.ts";
import      AST2JS_24 from "./controlflows/tryblock/try/ast2js.ts";
import AST_CONVERT_25 from "./controlflows/tryblock/catchblock/astconvert.ts";
import      AST2JS_25 from "./controlflows/tryblock/catchblock/ast2js.ts";
import AST_CONVERT_26 from "./controlflows/tryblock/catch/astconvert.ts";
import      AST2JS_26 from "./controlflows/tryblock/catch/ast2js.ts";
import AST_CONVERT_27 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_27 from "./controlflows/ifblock/ast2js.ts";
import AST_CONVERT_28 from "./controlflows/for/astconvert.ts";
import      AST2JS_28 from "./controlflows/for/ast2js.ts";
import AST_CONVERT_29 from "./comments/astconvert.ts";
import      AST2JS_29 from "./comments/ast2js.ts";


const MODULES = {
	"symbol": {
		AST_CONVERT: AST_CONVERT_0,
		     AST2JS:      AST2JS_0
	},
	"structs.tuple": {
		AST_CONVERT: AST_CONVERT_1,
		     AST2JS:      AST2JS_1
	},
	"structs.list": {
		AST_CONVERT: AST_CONVERT_2,
		     AST2JS:      AST2JS_2
	},
	"return": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"pass": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"operators.attr": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"operators.[]": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"operators.==": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"operators.=": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
	"operators.+": {
		AST_CONVERT: AST_CONVERT_9,
		     AST2JS:      AST2JS_9
	},
	"literals.str": {
		AST_CONVERT: AST_CONVERT_10,
		     AST2JS:      AST2JS_10
	},
	"literals.int": {
		AST_CONVERT: AST_CONVERT_11,
		     AST2JS:      AST2JS_11
	},
	"literals.float": {
		AST_CONVERT: AST_CONVERT_12,
		     AST2JS:      AST2JS_12
	},
	"literals.f-string": {
		AST_CONVERT: AST_CONVERT_13,
		     AST2JS:      AST2JS_13
	},
	"literals.f-string/FormattedValue": {
		AST_CONVERT: AST_CONVERT_14,
		     AST2JS:      AST2JS_14
	},
	"literals.bool": {
		AST_CONVERT: AST_CONVERT_15,
		     AST2JS:      AST2JS_15
	},
	"literals.None": {
		AST_CONVERT: AST_CONVERT_16,
		     AST2JS:      AST2JS_16
	},
	"keywords.raise": {
		AST_CONVERT: AST_CONVERT_17,
		     AST2JS:      AST2JS_17
	},
	"keywords.import": {
		AST_CONVERT: AST_CONVERT_18,
		     AST2JS:      AST2JS_18
	},
	"keywords.import/alias": {
		AST_CONVERT: AST_CONVERT_19,
		     AST2JS:      AST2JS_19
	},
	"functions.def": {
		AST_CONVERT: AST_CONVERT_20,
		     AST2JS:      AST2JS_20
	},
	"functions.call": {
		AST_CONVERT: AST_CONVERT_21,
		     AST2JS:      AST2JS_21
	},
	"controlflows.while": {
		AST_CONVERT: AST_CONVERT_22,
		     AST2JS:      AST2JS_22
	},
	"controlflows.tryblock": {
		AST_CONVERT: AST_CONVERT_23,
		     AST2JS:      AST2JS_23
	},
	"controlflows.tryblock/try": {
		AST_CONVERT: AST_CONVERT_24,
		     AST2JS:      AST2JS_24
	},
	"controlflows.tryblock/catchblock": {
		AST_CONVERT: AST_CONVERT_25,
		     AST2JS:      AST2JS_25
	},
	"controlflows.tryblock/catch": {
		AST_CONVERT: AST_CONVERT_26,
		     AST2JS:      AST2JS_26
	},
	"controlflows.ifblock": {
		AST_CONVERT: AST_CONVERT_27,
		     AST2JS:      AST2JS_27
	},
	"controlflows.for": {
		AST_CONVERT: AST_CONVERT_28,
		     AST2JS:      AST2JS_28
	},
	"comments": {
		AST_CONVERT: AST_CONVERT_29,
		     AST2JS:      AST2JS_29
	},
}

export default MODULES;


const RUNTIME = {};
Object.assign(RUNTIME, RUNTIME_17);
Object.assign(RUNTIME, RUNTIME_23);


export const _b_ = RUNTIME;
