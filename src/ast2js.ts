import { AST2JS } from "core_modules/lists";
import { ARRAY_TYPE, CODE_BEG, CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END, CODE_END_COL, CODE_END_LINE, CODE_LINE, JS_CODE, PY_CODE } from "dop";
import { AST } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export const CURSOR = new ARRAY_TYPE(2);

export let jscode: string;

export function set_js_cursor(idx: number) {
    JS_CODE[idx + CODE_LINE] = CURSOR[CODE_LINE];
    JS_CODE[idx + CODE_COL ] = jscode!.length - CURSOR[CODE_COL];
}

export function set_py_code_from_list(offset: number, brython_node: any) {

    const beg = brython_node[0];
    const end = brython_node[brython_node.length-1];

    PY_CODE[ offset + CODE_BEG_LINE ] = beg.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = beg.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = end.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = end.end_col_offset;
}


export function set_py_from_beg( src_offset: number, dst_offset: number ) {

    PY_CODE[ src_offset + CODE_BEG_LINE ] = PY_CODE[ dst_offset + CODE_BEG_LINE ];
    PY_CODE[ src_offset + CODE_BEG_COL  ] = PY_CODE[ dst_offset + CODE_BEG_COL  ];
}
export function set_py_from_end( src_offset: number, dst_offset: number ) {

    PY_CODE[ src_offset + CODE_END_LINE ] = PY_CODE[ dst_offset + CODE_END_LINE ];
    PY_CODE[ src_offset + CODE_END_COL  ] = PY_CODE[ dst_offset + CODE_END_COL  ];
}

export function set_py_code(offset: number, brython_node: any) {

    PY_CODE[ offset + CODE_BEG_LINE ] = brython_node.lineno;
    PY_CODE[ offset + CODE_BEG_COL  ] = brython_node.col_offset;
    PY_CODE[ offset + CODE_END_LINE ] = brython_node.end_lineno;
    PY_CODE[ offset + CODE_END_COL  ] = brython_node.end_col_offset;
}

function new_jscode(filename: string) {

    jscode  = `//# sourceURL=${filename}\n`;
    jscode += `const {_r_, _b_} = __SBRYTHON__;\n`;

    CURSOR[CODE_LINE] = 3;
    CURSOR[CODE_COL] = jscode.length;
}

type Printable = {toString(): string};

let indent = "    ";
let cur_indent_level = 0;
//let cur_indent = "";

const indents = [
    "",
    "",
    indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
    indent+=indent,
]

export const NL = {
    toString: function() {

        ++CURSOR[CODE_LINE];
        CURSOR[CODE_COL] = jscode.length + 1;

        return "\n" + indents[cur_indent_level];
    }
}
export const BB = {
    toString: function() {
        return indents[++cur_indent_level];
    }
}
export const BE = {
    toString: function() {
        return indents[--cur_indent_level];
    }
}

// transforms into a template string
export function r(...args: [TemplateStringsArray, ...(Printable|ASTNode)[]]) {
    return args;
}

// write a template string
export function wr(args: [TemplateStringsArray, ...(Printable|ASTNode)[]]) {
    if( typeof args === "string")
        return w(args);
    return wt(...args);
}

// write with template string wt``
export function wt(str: TemplateStringsArray, ...args: (Printable|ASTNode)[]) {
    
    for(let i = 0; i < args.length; ++i) {
        jscode += str[i];
        w(args[i]);
    }

    jscode += str[args.length];
}

// generic write ?
export function w(...args: (Printable|ASTNode)[]) {

    for(let i = 0; i < args.length; ++i) {

        let arg = args[i];

        if( Array.isArray(arg) ) { // likely a r``
            wr(arg as Parameters<typeof wr>[0]);
            continue;
        }

        if( ! (arg instanceof ASTNode) ) {

            if( arg === undefined )
                arg = "undefined";
            if( arg === null )
                arg = "null";

            jscode += arg.toString();
            continue;
        }

        const offset = 4*arg.id;
        
        set_js_cursor(offset + CODE_BEG);
        AST2JS[arg.type_id!](arg);
        set_js_cursor(offset + CODE_END)
    }
}

export function ast2js(ast: AST) {

    new_jscode(ast.filename);

    w(ast.body);

    // TODO: better export strategy (?)
    jscode += `\nconst __exported__ = {};\n`;

    //console.warn(jscode);

    /**
    const lines = ast.body.children;
    const exported = new Array(lines.length);
    let offset = 0;
    for(let i = 0; i < lines.length; ++i) {
        if( lines[i].type === "functions.def")
        exported[i] = lines[i].value;
    }
    exported.length = offset;

    jscode += `\nconst __exported__ = {${exported.join(', ')}};\n`;
    /**/

	return jscode;
}