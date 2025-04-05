export const ARRAY_TYPE   = Float64Array;
const ELEM_SIZE = 8;
const MAX_NB_ASTNODES = 105 /**/ * 20 /**/; // when merged

export const CODE_LINE = 0;
export const CODE_COL  = 1;
export const CODE_BEG  = 0;
export const CODE_END  = 2;
export const CODE_BEG_LINE = CODE_BEG + CODE_LINE;
export const CODE_BEG_COL  = CODE_BEG + CODE_COL;
export const CODE_END_LINE = CODE_END + CODE_LINE;
export const CODE_END_COL  = CODE_END + CODE_COL;

export const PY_CODE = __DEBUG__ ? new ARRAY_TYPE(4*MAX_NB_ASTNODES) : null as unknown as InstanceType<typeof ARRAY_TYPE>;
export const JS_CODE = __DEBUG__ ? new ARRAY_TYPE(4*MAX_NB_ASTNODES) : null as unknown as InstanceType<typeof ARRAY_TYPE>;

//TODO: indirection ou par ID...
export const VALUES = new Array<any>() as any as Record<NODE_ID, any>;

let NEXT_AST_NODE_ID = 0;

const s = Symbol();
export type NODE_ID = 0 | typeof s;

export function addFirstChild(node: NODE_ID): NODE_ID {
    // createNode + setFirstChild
    return ASTNODES[ (node as number) * ASTNODE_SIZE + ASTNODE_FIRST_CHILD] = NEXT_AST_NODE_ID++ as any;
}
export function addSibling(node: NODE_ID): NODE_ID {
    // createNode + setSibling
    return ASTNODES[ (node as number) * ASTNODE_SIZE + ASTNODE_NEXT_SIBLING] = NEXT_AST_NODE_ID++ as any;
}

export function createASTNode(): NODE_ID {
    return NEXT_AST_NODE_ID++ as any;
}

export default function dop_reset() {
    (VALUES as any).length = 0;
    NEXT_AST_NODE_ID = 0;
    // @ts-ignore
    BUFFER.resize( 0 );
    // @ts-ignore
    BUFFER.resize( BUFFER_SIZE );
}

export const ASTNODE_TYPE_ID            = 0; // set initially
export const ASTNODE_PARENT_OP_PRIORITY = 1;
export const ASTNODE_FIRST_CHILD        = 2; // set if children
export const ASTNODE_NEXT_SIBLING       = 3; // set if sibling
export const ASTNODE_RESULT_TYPE        = 4; // set if expr.
export const ASTNODE_SIZE               = 5;

const BUFFER_SIZE = ASTNODE_SIZE * ELEM_SIZE * MAX_NB_ASTNODES;
// @ts-ignore
const BUFFER = new ArrayBuffer(BUFFER_SIZE, {maxByteLength: BUFFER_SIZE});

export const ASTNODES = new ARRAY_TYPE(BUFFER);

export function type(node: NODE_ID) {
    return ASTNODES[(node as number)* ASTNODE_SIZE + ASTNODE_TYPE_ID];
}
export function nextSibling(node: NODE_ID): NODE_ID {
    return ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_NEXT_SIBLING] as any;
}
export function firstChild(parent: NODE_ID): NODE_ID {
    return ASTNODES[(parent as number) * ASTNODE_SIZE + ASTNODE_FIRST_CHILD] as any;
}
export function resultType(node: NODE_ID) {
    return ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_RESULT_TYPE];
}
export function parentOPPrio(node: NODE_ID) {
    return ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY];
}

export function setFirstChild(parent: NODE_ID, value: NODE_ID) {
    return ASTNODES[(parent as number) * ASTNODE_SIZE + ASTNODE_FIRST_CHILD] = value as any;
}
export function setSibling(node: NODE_ID, sibling: NODE_ID) {
    return ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_NEXT_SIBLING] = sibling as any;
}
export function setType(node: NODE_ID, value: number) {
    ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_TYPE_ID] = value;
}
export function setResultType(node: NODE_ID, value: number) {
    ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_RESULT_TYPE] = value;
}
export function setParentOPPrio(node: NODE_ID, value: number) {
    ASTNODES[(node as number) * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY] = value;
}