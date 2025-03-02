import { LITERALS_FLOAT } from "core_modules/lists";
import { setResultType, setType, VALUES } from "dop";
import { Context } from "py2ast";
import { STYPE_FLOAT } from "structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    if( ! (node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float")
        return false;

    setType(dst, LITERALS_FLOAT);
    setResultType(dst, STYPE_FLOAT);
    
    VALUES[dst] = node.value.value;
}

convert.brython_name = "Constant";