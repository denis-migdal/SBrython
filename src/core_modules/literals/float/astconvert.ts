import { LITERALS_FLOAT } from "@SBrython/core_modules/lists";
import { setResultType, setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { STYPE_FLOAT } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    if( ! (node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float")
        return false;

    setType(dst, LITERALS_FLOAT);
    setResultType(dst, STYPE_FLOAT);
    
    VALUES[dst] = node.value.value;
}

convert.brython_name = "Constant";