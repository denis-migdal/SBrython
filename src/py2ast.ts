import dop_reset, {ASTNODE_SIZE, ASTNODES, CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END_COL, CODE_END_LINE, CODE_LINE, createASTNode, firstChild, PY_CODE, resultType, type, VALUES} from "@SBrython/dop";
import { RET_INT, RETURN_TYPE_FCT } from "@SBrython/structs/ReturnTypeFcts";

import BRY2SBRY from "./bry2sbry/list";
import Body from "./bry2sbry/Body";
import { method_wrapper } from "./types/utils/methods";
import { addType } from "./types/utils/addType";
import { TYPEID_type_float_, TYPEID_type_int_, TYPEID_type_str_ } from "./types";

import Types from "@SBrython/types/list";
import { WRITE_CALL } from "./types/utils/types";

export type AST = {
    nodes   : typeof ASTNODES,
    filename: string
}

export function printNode(id: number) {

    console.warn({
        type     : type(id),
        ret_type : Types[resultType(id)].__name__,
        value    : VALUES[id],
    });
}

export function buildPyCode(id: number) {
    const offset = 4*id;

    return {
        start: {
            line: PY_CODE[ offset + CODE_BEG_LINE ],
            col : PY_CODE[ offset + CODE_BEG_COL  ]
        },
        end  : {
            line: PY_CODE[ offset + CODE_END_LINE ],
            col : PY_CODE[ offset + CODE_END_COL  ]
        }
    };
}

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

export function py2ast(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
	const _ast   = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    
    const nodes = convert_ast(_ast)

	return {
        nodes, //TODO: slice
        filename
    }
}

export function convert_ast(ast: any) {

    dop_reset();

    const id = createASTNode();
    Body(id, ast.body, new Context() );
    if(__DEBUG__) set_py_code_from_list(id, ast.body);

    return ASTNODES;

    /*function count(node: ASTNode) {

        let sum = 1; // count myself
        for(let i = 0; i < node.children.length; ++i )
            sum += count(node.children[i]);
        return sum;
    }
    console.warn( count(result) );*/
}

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

export class Context {
    constructor(type: "?"|"class"|"fct" = "?", parent_context: Context = RootContext) {
        this.type = type; //TODO: remove
        this.local_symbols = {...parent_context.local_symbols};
    }

    local_symbols: Record<string, number>;
    parent_node_context?: number; 

    type; //TODO: remove
}

const type_fct = {} /* fct class => type class */

//TODO: move...
//TODO: binary/unary
//TODO: remove return_type (get from the __{name}__)
function genUnaryOpFct(name: string, return_type: RETURN_TYPE_FCT) {
    const opname = `__${name}__`;
    return {
        __class__: type_fct,
        __name__ : name,
        __call__ : method_wrapper(return_type, (call: number) => {
            const left   = firstChild(call)+1;
            const method = Types[resultType(left)]![opname];
            return method[WRITE_CALL](call);
        })
    }
}

// builtin symbols.
// @ts-ignore
const RootContext: Context = {
    type: "?" as const,
    local_symbols: {
        int  : TYPEID_type_int_,
        str  : TYPEID_type_str_,
        float: TYPEID_type_float_,
        len  : addType("len", genUnaryOpFct("len", RET_INT)) //TODO...

        // add functions like len() / pow() / divmod()
    }
} satisfies Context;