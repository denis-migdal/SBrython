import { KEYWORDS_BREAK } from "@SBrython/core_modules/lists";
import { setType } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, KEYWORDS_BREAK);

}

convert.brython_name = "Break";