import { KEYWORDS_CONTINUE } from "core_modules/lists";
import { setType } from "dop";
import { Context } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_CONTINUE);

}

convert.brython_name = "Continue";