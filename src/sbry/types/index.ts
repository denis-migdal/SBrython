import LIST from './list';
export default LIST;

require("./unknown");
require("./None");
require("./NotImplemented");
require("./type");
require("./int");
require("./jsint");
require("./float");
require("./bool");
require("./str");

const _id2name = __SBRY_MODE__ !== 'dev' ? [] : [
	"unknown",
	"NoneType",
	"None",
	"NotImplementedType",
	"NotImplemented",
	"type",
	"type_int_",
	"int",
	"type_jsint_",
	"jsint",
	"type_float_",
	"float",
	"type_bool_",
	"bool",
	"type_str_",
	"str",
];
export const id2name = _id2name;
