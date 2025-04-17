import LIST from './list';
export default LIST;

require("./unknown");
require("./None");
require("./NotImplemented");
require("./int");
require("./jsint");
require("./float");
require("./bool");
require("./str");
require("./type");

const _id2name = ! __DEBUG__ ? [] : [
	"unknown",
	"None",
	"NoneType",
	"NotImplemented",
	"NotImplementedType",
	"int",
	"jsint",
	"float",
	"bool",
	"str",
	"type",
	"type_int_",
	"type_jsint_",
	"type_float_",
	"type_str_",
	"type_bool_",
];
export const id2name = _id2name;
