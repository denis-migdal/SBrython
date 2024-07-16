import AST_CONVERT_0 from "./symbol/astconvert.ts";
import      AST2JS_0 from "./symbol/ast2js.ts";
import AST_CONVERT_1 from "./operators/astconvert.ts";
import      AST2JS_1 from "./operators/ast2js.ts";
import AST_CONVERT_2 from "./operator.==/astconvert.ts";
import      AST2JS_2 from "./operator.==/ast2js.ts";
import AST_CONVERT_3 from "./operator.=/astconvert.ts";
import      AST2JS_3 from "./operator.=/ast2js.ts";
import AST_CONVERT_4 from "./int/astconvert.ts";
import      AST2JS_4 from "./int/ast2js.ts";
import AST_CONVERT_5 from "./ifblock/astconvert.ts";
import      AST2JS_5 from "./ifblock/ast2js.ts";
import AST_CONVERT_6 from "./fctcall/astconvert.ts";
import      AST2JS_6 from "./fctcall/ast2js.ts";
import AST_CONVERT_7 from "./bool/astconvert.ts";
import      AST2JS_7 from "./bool/ast2js.ts";
import AST_CONVERT_8 from "./None/astconvert.ts";
import      AST2JS_8 from "./None/ast2js.ts";


const MODULES = {
	"symbol": {
		AST_CONVERT: AST_CONVERT_0,
		     AST2JS:      AST2JS_0
	},
	"operators": {
		AST_CONVERT: AST_CONVERT_1,
		     AST2JS:      AST2JS_1
	},
	"operator.==": {
		AST_CONVERT: AST_CONVERT_2,
		     AST2JS:      AST2JS_2
	},
	"operator.=": {
		AST_CONVERT: AST_CONVERT_3,
		     AST2JS:      AST2JS_3
	},
	"int": {
		AST_CONVERT: AST_CONVERT_4,
		     AST2JS:      AST2JS_4
	},
	"ifblock": {
		AST_CONVERT: AST_CONVERT_5,
		     AST2JS:      AST2JS_5
	},
	"fctcall": {
		AST_CONVERT: AST_CONVERT_6,
		     AST2JS:      AST2JS_6
	},
	"bool": {
		AST_CONVERT: AST_CONVERT_7,
		     AST2JS:      AST2JS_7
	},
	"None": {
		AST_CONVERT: AST_CONVERT_8,
		     AST2JS:      AST2JS_8
	},
}

export default MODULES;
