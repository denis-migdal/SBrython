// must NOT depends on list.
import BRY2SBRY from "./"; // required for correct type deduction...
import type {Context} from "./index.d.ts";
export type {Context};

import { CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END_COL, CODE_END_LINE, CODE_LINE, NODE_ID, PY_CODE, VALUES } from "../dop";

export function convert_node(id: NODE_ID, brython_node: any, context: Context) {

    const name = brython_node.constructor.$name;

    const convert = BRY2SBRY[name as keyof typeof BRY2SBRY];

    if( __SBRY_MODE__ === "dev" && convert === undefined) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log( brython_node );
        throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
    }

    convert(id, brython_node, context);
    if( __SBRY_MODE__ === "dev" ) set_py_code(id, brython_node);

}

// ================ POS ====================

export function set_py_code(id: NODE_ID, brython_node: any) {

    const offset = 4*(id as number);
    PY_CODE[ offset + CODE_BEG_LINE ] = brython_node.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = brython_node.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = brython_node.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = brython_node.end_col_offset;
}

export function set_py_code_from_list(id: NODE_ID, brython_node: any) {

    const offset = 4*(id as number);

    const beg = brython_node[0];
    const end = brython_node[brython_node.length-1];

    PY_CODE[ offset + CODE_BEG_LINE ] = beg.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = beg.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = end.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = end.end_col_offset;
}


export function set_py_from_beg_end( src: NODE_ID, dst_beg: NODE_ID, dst_end: NODE_ID ) {

    const src_offset = 4*(src as number);
    const beg_offset = 4*(dst_beg as number);
    const end_offset = 4*(dst_end as number) + 2;

    PY_CODE[ src_offset + CODE_BEG_LINE ] = PY_CODE[ beg_offset + CODE_LINE ];
    PY_CODE[ src_offset + CODE_BEG_COL  ] = PY_CODE[ beg_offset + CODE_COL  ];

    PY_CODE[ src_offset + CODE_END_LINE ] = PY_CODE[ end_offset + CODE_LINE ];
    PY_CODE[ src_offset + CODE_END_COL  ] = PY_CODE[ end_offset + CODE_COL  ];
}