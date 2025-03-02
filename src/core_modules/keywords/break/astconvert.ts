import { KEYWORDS_BREAK } from "core_modules/lists";
import { setType } from "dop";
import { Context } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, KEYWORDS_BREAK);

}

convert.brython_name = "Break";