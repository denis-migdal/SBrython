import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./operators/==/astconvert.ts";
import      AST2JS_1 from "./operators/==/ast2js.ts";
import AST_CONVERT_2 from "./operators/=/astconvert.ts";
import      AST2JS_2 from "./operators/=/ast2js.ts";
import AST_CONVERT_3 from "./operators/+/astconvert.ts";
import      AST2JS_3 from "./operators/+/ast2js.ts";
import AST_CONVERT_4 from "./literals/int/astconvert.ts";
import      AST2JS_4 from "./literals/int/ast2js.ts";
import AST_CONVERT_5 from "./literals/bool/astconvert.ts";
import      AST2JS_5 from "./literals/bool/ast2js.ts";
import AST_CONVERT_6 from "./literals/None/astconvert.ts";
import      AST2JS_6 from "./literals/None/ast2js.ts";
import AST_CONVERT_7 from "./fctcall/astconvert.ts";
import      AST2JS_7 from "./fctcall/ast2js.ts";
import AST_CONVERT_8 from "./controlflows/ifblock/astconvert.ts";
import      AST2JS_8 from "./controlflows/ifblock/ast2js.ts";


const MODULES = {
	"symbol": {
		AST_CONVERT: AST_CONVERT_0,
		     AST2JS:      AST2JS_0
	},
	"operators.==": {
		AST_CONVERT: AST_CONVERT_1,
		     AST2JS:      AST2JS_1
	},
	"operators.=": {
		AST_CONVERT: AST_CONVERT_2,
		     AST2JS:      AST2JS_2
	},
	"operators.+": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"literals.int": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"literals.bool": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"literals.None": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"fctcall": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"controlflows.ifblock": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
}

export default MODULES;
