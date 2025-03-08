import { LITERALS_BOOL } from "@SBrython/core_modules/lists";
import { setResultType, setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { STYPE_BOOL } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    if( typeof node.value !== "boolean" )
        return false;

    setType(dst, LITERALS_BOOL);
    setResultType(dst, STYPE_BOOL);
    
    VALUES[dst] = node.value; // TODO: 2 types instead of one ?
}

convert.brython_name = "Constant";