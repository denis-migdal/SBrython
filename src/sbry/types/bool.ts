import { addJSCmpOps, JSCmpOps_LIST } from "@SBrython/sbry/structs/operators/compare";
import { RET_IJBF2BOOL } from "@SBrython/sbry/structs/ReturnTypeFcts";
import { TYPEID_bool, TYPEID_type_bool_ } from "./list";
import { initBuiltinClass } from "./utils/methods";

const klass = initBuiltinClass(TYPEID_bool, TYPEID_type_bool_, "bool", "Boolean");

addJSCmpOps(klass, JSCmpOps_LIST, RET_IJBF2BOOL);