import { KEYWORDS_IMPORT_ALIAS } from "@SBrython/core_modules/lists";
import { setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_IMPORT_ALIAS);
    
    VALUES[dst] = [node.name, node.asname];

}