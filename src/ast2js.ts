import { AST2JS } from "@SBrython/core_modules/lists";
import { ARRAY_TYPE, CODE_BEG, CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END, CODE_END_COL, CODE_END_LINE, CODE_LINE, JS_CODE, type } from "@SBrython/dop";
import { AST } from "@SBrython/py2ast";

//TODO...
export const CURSOR = __DEBUG__ ? new ARRAY_TYPE(2) : null as unknown as InstanceType<typeof ARRAY_TYPE>;

export let jscode: string;

export function set_js_cursor(idx: number) {
    JS_CODE[idx + CODE_LINE] = CURSOR[CODE_LINE];
    JS_CODE[idx + CODE_COL ] = jscode!.length - CURSOR[CODE_COL];
}


export function buildJSCode(id: number) {
    const offset = 4*id;
    
    return {
        start: {
            line: JS_CODE[ offset + CODE_BEG_LINE ],
            col : JS_CODE[ offset + CODE_BEG_COL  ]
        },
        end  : {
            line: JS_CODE[ offset + CODE_END_LINE ],
            col : JS_CODE[ offset + CODE_END_COL  ]
        }
    };
}

function new_jscode(filename: string) {

    jscode  = `//# sourceURL=${filename}\n`;
    jscode += `const {_r_, _b_} = __SBRYTHON__;\n`;

    if(__DEBUG__) {
        CURSOR[CODE_LINE] = 3;
        CURSOR[CODE_COL] = jscode.length;
    }
}

let indent = "    ";
let cur_indent_level = -1;
//let cur_indent = "";

const indents = __DEBUG__ ? [
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
] : null;

export function w_NL() {

    jscode += "\n";

    if( __DEBUG__ ) {
        ++CURSOR[CODE_LINE];
        CURSOR[CODE_COL] = jscode.length;

        jscode += indents![cur_indent_level];
    }
}
export function BB() {
    ++cur_indent_level;
}

export function BE() {
    --cur_indent_level;
}

// =======================================================================

export function w_str(str: string) {
    jscode += str;
}
export function w_node(node: number) {
    if( __DEBUG__ ) set_js_cursor(4*node + CODE_BEG);
    AST2JS[type(node)!](node);
    if( __DEBUG__ ) set_js_cursor(4*node + CODE_END);
}

type W_SNS = [string, number, string]
    | [string, number, string, number, string]
    | [string, number, string, number, string, number, string]
    | [string, number, string, number, string, number, string, number, string];

export function w_sns(...args: W_SNS) { //TODO: alternate

    jscode += args[0];

    for(let i = 1; i < args.length; i+=2) {

        const node = args[i] as number;

        if( __DEBUG__ ) set_js_cursor(4*node + CODE_BEG);
        AST2JS[type(node)!](node);
        if( __DEBUG__ ) set_js_cursor(4*node + CODE_END);

        jscode += args[i+1];
    }
}

// =======================================================================

export function ast2js(ast: AST) {

    new_jscode(ast.filename);

    w_node(0);

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