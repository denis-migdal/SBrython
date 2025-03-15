// must NOT depends on list.
import BRY2SBRY from "./index"; // required for correct type deduction...
import type {Context} from "./index.d.ts";
export type {Context};

import { ASTNODE_SIZE, ASTNODES, CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END_COL, CODE_END_LINE, CODE_LINE, PY_CODE, VALUES } from "../dop";

//TODO: use firstChild + nextSibling instead of nbChild
export function swapASTNodes(a: number, b: number ) {

    const ao = ASTNODE_SIZE * a;
    const bo = ASTNODE_SIZE * b;

    let t:any;
    for(let i = 0; i < ASTNODE_SIZE; ++i) {
        t = ASTNODES[ao+i];
        ASTNODES[ao+i] = ASTNODES[bo+i];
        ASTNODES[bo+i] = t;
    }

    if( __DEBUG__ ) {
        const ap = 4*a;
        const bp = 4*b;
        for(let i = 0; i < 4; ++i) {
            t = PY_CODE[ap+i];
            PY_CODE[ap+i] = PY_CODE[bp+i];
            PY_CODE[bp+i] = t;
        }
    }

    t = VALUES[a];
    VALUES[a] = VALUES[b];
    VALUES[b] = t;
}

export function convert_node(id: number, brython_node: any, context: Context) {

    const name = brython_node.constructor.$name;

    const convert = BRY2SBRY[name as keyof typeof BRY2SBRY];

    if( __DEBUG__ && convert === undefined) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log( brython_node );
        throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
    }

    convert(id, brython_node, context);
    if( __DEBUG__ ) set_py_code(id, brython_node);

}

// ================ POS ====================

export function set_py_code(id: number, brython_node: any) {

    const offset = 4*id;
    PY_CODE[ offset + CODE_BEG_LINE ] = brython_node.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = brython_node.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = brython_node.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = brython_node.end_col_offset;
}

export function set_py_code_from_list(id: number, brython_node: any) {

    const offset = 4*id;

    const beg = brython_node[0];
    const end = brython_node[brython_node.length-1];

    PY_CODE[ offset + CODE_BEG_LINE ] = beg.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = beg.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = end.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = end.end_col_offset;
}


export function set_py_from_beg_end( src: number, dst_beg: number, dst_end: number ) {

    const src_offset = 4*src;
    const beg_offset = 4*dst_beg;
    const end_offset = 4*dst_end + 2;

    PY_CODE[ src_offset + CODE_BEG_LINE ] = PY_CODE[ beg_offset + CODE_LINE ];
    PY_CODE[ src_offset + CODE_BEG_COL  ] = PY_CODE[ beg_offset + CODE_COL  ];

    PY_CODE[ src_offset + CODE_END_LINE ] = PY_CODE[ end_offset + CODE_LINE ];
    PY_CODE[ src_offset + CODE_END_COL  ] = PY_CODE[ end_offset + CODE_COL  ];
}