import { PASS } from "core_modules/lists";
import { setType } from "dop";
import { Context } from "py2ast";

export default function convert(dst: number, node: any, _context: Context) {
    setType(dst, PASS);
}


convert.brython_name = "Pass";