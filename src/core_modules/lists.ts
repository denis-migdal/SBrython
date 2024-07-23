import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./return/astconvert.ts";
import      AST2JS_1 from "./return/ast2js.ts";
import AST_CONVERT_2 from "./pass/astconvert.ts";
import      AST2JS_2 from "./pass/ast2js.ts";
import AST_CONVERT_3 from "./operators/attr/astconvert.ts";
import      AST2JS_3 from "./operators/attr/ast2js.ts";
import AST_CONVERT_4 from "./operators/==/astconvert.ts";
import      AST2JS_4 from "./operators/==/ast2js.ts";
import AST_CONVERT_5 from "./operators/=/astconvert.ts";
import      AST2JS_5 from "./operators/=/ast2js.ts";
import AST_CONVERT_6 from "./operators/+/astconvert.ts";
import      AST2JS_6 from "./operators/+/ast2js.ts";
import AST_CONVERT_7 from "./literals/str/astconvert.ts";
import      AST2JS_7 from "./literals/str/ast2js.ts";
import AST_CONVERT_8 from "./literals/int/astconvert.ts";
import      AST2JS_8 from "./literals/int/ast2js.ts";
import AST_CONVERT_9 from "./literals/float/astconvert.ts";
import      AST2JS_9 from "./literals/float/ast2js.ts";
import AST_CONVERT_10 from "./literals/f-string/astconvert.ts";
import      AST2JS_10 from "./literals/f-string/ast2js.ts";
import AST_CONVERT_11 from "./literals/f-string/FormattedValue/astconvert.ts";
import      AST2JS_11 from "./literals/f-string/FormattedValue/ast2js.ts";
import AST_CONVERT_12 from "./literals/bool/astconvert.ts";
import      AST2JS_12 from "./literals/bool/ast2js.ts";
import AST_CONVERT_13 from "./literals/None/astconvert.ts";
import      AST2JS_13 from "./literals/None/ast2js.ts";
import AST_CONVERT_14 from "./keywords/raise/astconvert.ts";
import      AST2JS_14 from "./keywords/raise/ast2js.ts";
import     RUNTIME_14 from "./keywords/raise/runtime.ts";
import AST_CONVERT_15 from "./keywords/import/astconvert.ts";
import      AST2JS_15 from "./keywords/import/ast2js.ts";
import AST_CONVERT_16 from "./keywords/import/alias/astconvert.ts";
import      AST2JS_16 from "./keywords/import/alias/ast2js.ts";
import AST_CONVERT_17 from "./functions/def/astconvert.ts";
import      AST2JS_17 from "./functions/def/ast2js.ts";
import AST_CONVERT_18 from "./functions/call/astconvert.ts";
import      AST2JS_18 from "./functions/call/ast2js.ts";
import AST_CONVERT_19 from "./controlflows/while/astconvert.ts";
import      AST2JS_19 from "./controlflows/while/ast2js.ts";
import AST_CONVERT_20 from "./controlflows/tryblock/astconvert.ts";
import      AST2JS_20 from "./controlflows/tryblock/ast2js.ts";
import     RUNTIME_20 from "./controlflows/tryblock/runtime.ts";
import AST_CONVERT_21 from "./controlflows/tryblock/try/astconvert.ts";
import      AST2JS_21 from "./controlflows/tryblock/try/ast2js.ts";
import AST_CONVERT_22 from "./controlflows/tryblock/catchblock/astconvert.ts";
import      AST2JS_22 from "./controlflows/tryblock/catchblock/ast2js.ts";
import AST_CONVERT_23 from "./controlflows/tryblock/catch/astconvert.ts";
import      AST2JS_23 from "./controlflows/tryblock/catch/ast2js.ts";
import AST_CONVERT_24 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_24 from "./controlflows/ifblock/ast2js.ts";
import AST_CONVERT_25 from "./controlflows/for/astconvert.ts";
import      AST2JS_25 from "./controlflows/for/ast2js.ts";
import AST_CONVERT_26 from "./comments/astconvert.ts";
import      AST2JS_26 from "./comments/ast2js.ts";


const MODULES = {
	"symbol": {
		AST_CONVERT: AST_CONVERT_0,
		     AST2JS:      AST2JS_0
	},
	"return": {
		AST_CONVERT: AST_CONVERT_1,
		     AST2JS:      AST2JS_1
	},
	"pass": {
		AST_CONVERT: AST_CONVERT_2,
		     AST2JS:      AST2JS_2
	},
	"operators.attr": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"operators.==": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"operators.=": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"operators.+": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"literals.str": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"literals.int": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
	"literals.float": {
		AST_CONVERT: AST_CONVERT_9,
		     AST2JS:      AST2JS_9
	},
	"literals.f-string": {
		AST_CONVERT: AST_CONVERT_10,
		     AST2JS:      AST2JS_10
	},
	"literals.f-string/FormattedValue": {
		AST_CONVERT: AST_CONVERT_11,
		     AST2JS:      AST2JS_11
	},
	"literals.bool": {
		AST_CONVERT: AST_CONVERT_12,
		     AST2JS:      AST2JS_12
	},
	"literals.None": {
		AST_CONVERT: AST_CONVERT_13,
		     AST2JS:      AST2JS_13
	},
	"keywords.raise": {
		AST_CONVERT: AST_CONVERT_14,
		     AST2JS:      AST2JS_14
	},
	"keywords.import": {
		AST_CONVERT: AST_CONVERT_15,
		     AST2JS:      AST2JS_15
	},
	"keywords.import/alias": {
		AST_CONVERT: AST_CONVERT_16,
		     AST2JS:      AST2JS_16
	},
	"functions.def": {
		AST_CONVERT: AST_CONVERT_17,
		     AST2JS:      AST2JS_17
	},
	"functions.call": {
		AST_CONVERT: AST_CONVERT_18,
		     AST2JS:      AST2JS_18
	},
	"controlflows.while": {
		AST_CONVERT: AST_CONVERT_19,
		     AST2JS:      AST2JS_19
	},
	"controlflows.tryblock": {
		AST_CONVERT: AST_CONVERT_20,
		     AST2JS:      AST2JS_20
	},
	"controlflows.tryblock/try": {
		AST_CONVERT: AST_CONVERT_21,
		     AST2JS:      AST2JS_21
	},
	"controlflows.tryblock/catchblock": {
		AST_CONVERT: AST_CONVERT_22,
		     AST2JS:      AST2JS_22
	},
	"controlflows.tryblock/catch": {
		AST_CONVERT: AST_CONVERT_23,
		     AST2JS:      AST2JS_23
	},
	"controlflows.ifblock": {
		AST_CONVERT: AST_CONVERT_24,
		     AST2JS:      AST2JS_24
	},
	"controlflows.for": {
		AST_CONVERT: AST_CONVERT_25,
		     AST2JS:      AST2JS_25
	},
	"comments": {
		AST_CONVERT: AST_CONVERT_26,
		     AST2JS:      AST2JS_26
	},
}

export default MODULES;


const RUNTIME = {};
Object.assign(RUNTIME, RUNTIME_14);
Object.assign(RUNTIME, RUNTIME_20);


export const _b_ = RUNTIME;
