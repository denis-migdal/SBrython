import { AST_KEY_CONTINUE } from "@SBrython/sbry/ast2js/";
import { setType } from "@SBrython/sbry/dop";
import type { Context } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, AST_KEY_CONTINUE);

}