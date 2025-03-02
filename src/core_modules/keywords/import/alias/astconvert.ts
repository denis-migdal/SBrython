import { KEYWORDS_IMPORT_ALIAS } from "core_modules/lists";
import { setType, VALUES } from "dop";
import { Context } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, KEYWORDS_IMPORT_ALIAS);
    
    VALUES[dst] = [node.name, node.asname];

}

convert.brython_name = ["alias"];