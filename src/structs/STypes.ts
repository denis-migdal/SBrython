import SType_float from "core_modules/literals/float/stype";
import SType_int from "core_modules/literals/int/stype";
import SType_str from "core_modules/literals/str/stype";
import SType_None from "core_modules/literals/None/stype";
import SType_bool from "core_modules/literals/bool/stype";

//export type STypeName = keyof typeof name2SType;

export function name2SType(name: string) {

    const name2SType = {
        "float"   : SType_float,
        "int"     : SType_int,
        "bool"    : SType_bool,
        "str"     : SType_str,
        "NoneType": SType_None
    }

    return name2SType[name as keyof typeof name2SType];
}