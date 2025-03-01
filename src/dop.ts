import { ASTNode } from "structs/ASTNode";

export const ARRAY_TYPE   = Float64Array;
const MAX_NB_TOKEN = 105;

export const CODE_LINE = 0;
export const CODE_COL  = 1;
export const CODE_BEG  = 0;
export const CODE_END  = 2;
export const CODE_BEG_LINE = CODE_BEG + CODE_LINE;
export const CODE_BEG_COL  = CODE_BEG + CODE_COL;
export const CODE_END_LINE = CODE_END + CODE_LINE;
export const CODE_END_COL  = CODE_END + CODE_COL;

export const PY_CODE = new ARRAY_TYPE(4*MAX_NB_TOKEN);
export const JS_CODE = new ARRAY_TYPE(4*MAX_NB_TOKEN);

//TODO: indirection ou par ID...
export const VALUES = new Array<any>();


export default function dop_reset() {
    VALUES.length = 0;
    ASTNode.NEXT_AST_NODE_ID = 0;
}