import { LITERALS_NONE } from "@SBrython/core_modules/lists";
import { setResultType, setType } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { STYPE_NONETYPE } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    if( ! (typeof node.value === "object")
            || !("__class__" in node.value)
            || node.value.__class__.__qualname__ !== "NoneType" )
        return false;

    setType(dst, LITERALS_NONE);
    setResultType(dst, STYPE_NONETYPE);
}

convert.brython_name = "Constant";