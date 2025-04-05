import { AST_KEY_PASS } from "@SBrython/sbry/ast2js/";
import { NODE_ID, setType } from "@SBrython/sbry/dop";
import type { Context } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, _context: Context) {
    setType(dst, AST_KEY_PASS);
}