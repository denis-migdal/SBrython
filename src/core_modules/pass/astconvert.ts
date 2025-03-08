import { PASS } from "@SBrython/core_modules/lists";
import { setType } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, _context: Context) {
    setType(dst, PASS);
}


convert.brython_name = "Pass";