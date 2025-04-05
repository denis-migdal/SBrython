import { AST_KEY_BREAK } from "@SBrython/sbry/ast2js/";
import { NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {
    
    setType(dst, AST_KEY_BREAK);

}