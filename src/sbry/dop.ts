export const ARRAY_TYPE   = Float64Array;
const ELEM_SIZE = 8;
const MAX_NB_ASTNODES = 105 /**/ * 40 /**/; // when merged

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
export const VALUES = new Array<any>();

let NEXT_AST_NODE_ID = 0;

export function addChild(parent: number, nbChild: number) {

    const offset = parent * ASTNODE_SIZE;
    
    ASTNODES[offset + ASTNODE_NB_CHILDREN] = nbChild;
    const id = ASTNODES[offset + ASTNODE_CHILDREN_START] = NEXT_AST_NODE_ID;
    NEXT_AST_NODE_ID += nbChild;

    return id;
}

export function createASTNode() {
    return NEXT_AST_NODE_ID++;
}

export function createASTNodes(nb: number) {
    NEXT_AST_NODE_ID += nb;
}

export default function dop_reset() {
    VALUES.length = 0;
    NEXT_AST_NODE_ID = 0;
    // @ts-ignore
    BUFFER.resize( 0 );
    // @ts-ignore
    BUFFER.resize( BUFFER_SIZE );
}

export const ASTNODE_TYPE_ID            = 0; // set initially
export const ASTNODE_PARENT_OP_PRIORITY = 1;
export const ASTNODE_CHILDREN_START     = 2; // set if children
export const ASTNODE_NB_CHILDREN        = 3; // set if unknown nb children
export const ASTNODE_RESULT_TYPE        = 4; // set if expr.
export const ASTNODE_SIZE               = 5;

const BUFFER_SIZE = ASTNODE_SIZE * ELEM_SIZE * MAX_NB_ASTNODES;
// @ts-ignore
const BUFFER = new ArrayBuffer(BUFFER_SIZE, {maxByteLength: BUFFER_SIZE});

export const ASTNODES = new ARRAY_TYPE(BUFFER);

export function type(node: number) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_TYPE_ID];
}
export function nbChild(parent: number) {
    return ASTNODES[parent * ASTNODE_SIZE + ASTNODE_NB_CHILDREN];
}
export function firstChild(parent: number) {
    return ASTNODES[parent * ASTNODE_SIZE + ASTNODE_CHILDREN_START];
}
export function resultType(node: number) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_RESULT_TYPE];
}
export function parentOPPrio(node: number) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY];
}

export function setFirstChild(parent: number, value: number) {
    return ASTNODES[parent * ASTNODE_SIZE + ASTNODE_CHILDREN_START] = value;
}
export function setType(node: number, value: number) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_TYPE_ID] = value;
}
export function setResultType(node: number, value: number) {
    ASTNODES[node * ASTNODE_SIZE + ASTNODE_RESULT_TYPE] = value;
}
export function setParentOPPrio(node: number, value: number) {
    ASTNODES[node * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY] = value;
}