import { KEYWORDS_CONTINUE } from "@SBrython/core_modules/lists";
import { setType } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_CONTINUE);

}

convert.brython_name = "Continue";