import SType_float from "core_modules/literals/float/stype";
import SType_int from "core_modules/literals/int/stype";
import SType_str from "core_modules/literals/str/stype";
import SType_None from "core_modules/literals/None/stype";
import SType_bool from "core_modules/literals/bool/stype";
import SType_jsint from "core_modules/literals/int/stype_jsint";
import { STypeObj } from "./SType";

//export type STypeName = keyof typeof name2SType;

export const _name2SType: Record<string,STypeObj> = {
    "float"   : SType_float,
    "int"     : SType_int,
    "jsint"   : SType_jsint,
    "bool"    : SType_bool,
    "str"     : SType_str,
    "NoneType": SType_None
}

export function name2SType(name: string) {
    return _name2SType[name];
}