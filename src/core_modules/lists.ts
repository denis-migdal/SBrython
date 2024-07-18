import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./pass/astconvert.ts";
import      AST2JS_1 from "./pass/ast2js.ts";
import AST_CONVERT_2 from "./operators/==/astconvert.ts";
import      AST2JS_2 from "./operators/==/ast2js.ts";
import AST_CONVERT_3 from "./operators/=/astconvert.ts";
import      AST2JS_3 from "./operators/=/ast2js.ts";
import AST_CONVERT_4 from "./operators/+/astconvert.ts";
import      AST2JS_4 from "./operators/+/ast2js.ts";
import AST_CONVERT_5 from "./literals/str/astconvert.ts";
import      AST2JS_5 from "./literals/str/ast2js.ts";
import AST_CONVERT_6 from "./literals/int/astconvert.ts";
import      AST2JS_6 from "./literals/int/ast2js.ts";
import AST_CONVERT_7 from "./literals/float/astconvert.ts";
import      AST2JS_7 from "./literals/float/ast2js.ts";
import AST_CONVERT_8 from "./literals/bool/astconvert.ts";
import      AST2JS_8 from "./literals/bool/ast2js.ts";
import AST_CONVERT_9 from "./literals/None/astconvert.ts";
import      AST2JS_9 from "./literals/None/ast2js.ts";
import AST_CONVERT_10 from "./fctcall/astconvert.ts";
import      AST2JS_10 from "./fctcall/ast2js.ts";
import AST_CONVERT_11 from "./controlflows/while/astconvert.ts";
import      AST2JS_11 from "./controlflows/while/ast2js.ts";
import AST_CONVERT_12 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_12 from "./controlflows/ifblock/ast2js.ts";
import AST_CONVERT_13 from "./comments/astconvert.ts";
import      AST2JS_13 from "./comments/ast2js.ts";


const MODULES = {
	"symbol": {
		AST_CONVERT: AST_CONVERT_0,
		     AST2JS:      AST2JS_0
	},
	"pass": {
		AST_CONVERT: AST_CONVERT_1,
		     AST2JS:      AST2JS_1
	},
	"operators.==": {
		AST_CONVERT: AST_CONVERT_2,
		     AST2JS:      AST2JS_2
	},
	"operators.=": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"operators.+": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"literals.str": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"literals.int": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"literals.float": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"literals.bool": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
	"literals.None": {
		AST_CONVERT: AST_CONVERT_9,
		     AST2JS:      AST2JS_9
	},
	"fctcall": {
		AST_CONVERT: AST_CONVERT_10,
		     AST2JS:      AST2JS_10
	},
	"controlflows.while": {
		AST_CONVERT: AST_CONVERT_11,
		     AST2JS:      AST2JS_11
	},
	"controlflows.ifblock": {
		AST_CONVERT: AST_CONVERT_12,
		     AST2JS:      AST2JS_12
	},
	"comments": {
		AST_CONVERT: AST_CONVERT_13,
		     AST2JS:      AST2JS_13
	},
}

export default MODULES;
