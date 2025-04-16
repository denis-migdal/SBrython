import { TYPEID_None, TYPEID_NoneType } from "./list";
import { initBuiltinClass } from "./utils/methods";

initBuiltinClass(TYPEID_None, TYPEID_NoneType, "NoneType", "null");