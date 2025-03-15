import { AST_KEY_BREAK } from "@SBrython/sbry/ast2js/";
import { setType } from "@SBrython/sbry/dop";
import { Context } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {
    
    setType(dst, AST_KEY_BREAK);

}