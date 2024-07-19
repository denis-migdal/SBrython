import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./return/astconvert.ts";
import      AST2JS_1 from "./return/ast2js.ts";
import AST_CONVERT_2 from "./pass/astconvert.ts";
import      AST2JS_2 from "./pass/ast2js.ts";
import AST_CONVERT_3 from "./operators/==/astconvert.ts";
import      AST2JS_3 from "./operators/==/ast2js.ts";
import AST_CONVERT_4 from "./operators/=/astconvert.ts";
import      AST2JS_4 from "./operators/=/ast2js.ts";
import AST_CONVERT_5 from "./operators/+/astconvert.ts";
import      AST2JS_5 from "./operators/+/ast2js.ts";
import AST_CONVERT_6 from "./literals/str/astconvert.ts";
import      AST2JS_6 from "./literals/str/ast2js.ts";
import AST_CONVERT_7 from "./literals/int/astconvert.ts";
import      AST2JS_7 from "./literals/int/ast2js.ts";
import AST_CONVERT_8 from "./literals/float/astconvert.ts";
import      AST2JS_8 from "./literals/float/ast2js.ts";
import AST_CONVERT_9 from "./literals/bool/astconvert.ts";
import      AST2JS_9 from "./literals/bool/ast2js.ts";
import AST_CONVERT_10 from "./literals/None/astconvert.ts";
import      AST2JS_10 from "./literals/None/ast2js.ts";
import AST_CONVERT_11 from "./fctdef/astconvert.ts";
import      AST2JS_11 from "./fctdef/ast2js.ts";
import AST_CONVERT_12 from "./fctcall/astconvert.ts";
import      AST2JS_12 from "./fctcall/ast2js.ts";
import AST_CONVERT_13 from "./controlflows/while/astconvert.ts";
import      AST2JS_13 from "./controlflows/while/ast2js.ts";
import AST_CONVERT_14 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_14 from "./controlflows/ifblock/ast2js.ts";
import AST_CONVERT_15 from "./controlflows/for/astconvert.ts";
import      AST2JS_15 from "./controlflows/for/ast2js.ts";
import AST_CONVERT_16 from "./comments/astconvert.ts";
import      AST2JS_16 from "./comments/ast2js.ts";


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
	"operators.==": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"operators.=": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"operators.+": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"literals.str": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"literals.int": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"literals.float": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
	"literals.bool": {
		AST_CONVERT: AST_CONVERT_9,
		     AST2JS:      AST2JS_9
	},
	"literals.None": {
		AST_CONVERT: AST_CONVERT_10,
		     AST2JS:      AST2JS_10
	},
	"fctdef": {
		AST_CONVERT: AST_CONVERT_11,
		     AST2JS:      AST2JS_11
	},
	"fctcall": {
		AST_CONVERT: AST_CONVERT_12,
		     AST2JS:      AST2JS_12
	},
	"controlflows.while": {
		AST_CONVERT: AST_CONVERT_13,
		     AST2JS:      AST2JS_13
	},
	"controlflows.ifblock": {
		AST_CONVERT: AST_CONVERT_14,
		     AST2JS:      AST2JS_14
	},
	"controlflows.for": {
		AST_CONVERT: AST_CONVERT_15,
		     AST2JS:      AST2JS_15
	},
	"comments": {
		AST_CONVERT: AST_CONVERT_16,
		     AST2JS:      AST2JS_16
	},
}

export default MODULES;
