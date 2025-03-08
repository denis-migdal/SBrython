import { LITERALS_STR } from "@SBrython/core_modules/lists";
import { setResultType, setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { STYPE_STR } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    if( typeof node.value !== "string")
        return false;

    setType(dst, LITERALS_STR);
    setResultType(dst, STYPE_STR);

    VALUES[dst] = node.value;
}

convert.brython_name = "Constant";