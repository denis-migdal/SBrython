import { AST2JS } from "core_modules/lists";
import { ARRAY_TYPE, ASTNODES, CODE_BEG, CODE_COL, CODE_END, CODE_LINE, JS_CODE, type } from "dop";
import { AST } from "py2ast";

export const CURSOR = new ARRAY_TYPE(2);

export let jscode: string;

export function set_js_cursor(idx: number) {
    JS_CODE[idx + CODE_LINE] = CURSOR[CODE_LINE];
    JS_CODE[idx + CODE_COL ] = jscode!.length - CURSOR[CODE_COL];
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
export function r(...args: [TemplateStringsArray, ...(Printable|number)[]]) {
    return args;
}

// write a template string
export function wr(args: [TemplateStringsArray, ...(Printable|number)[]]) {
    if( typeof args === "string")
        return w(args);
    return wt(...args);
}


// write with template string wt``
export function wt(str: TemplateStringsArray, ...args: (Printable|number)[]) {
    
    for(let i = 0; i < args.length; ++i) {
        jscode += str[i];
        w(args[i]);
    }

    jscode += str[args.length];
}

// generic write ?
export function w(...args: (Printable|number)[]) {

    for(let i = 0; i < args.length; ++i) {

        let arg = args[i];

        if( Array.isArray(arg) ) { // likely a r``
            wr(arg as Parameters<typeof wr>[0]);
            continue;
        }

        if( typeof arg !== "number" ) {

            if( arg === undefined )
                arg = "undefined";
            if( arg === null )
                arg = "null";

            jscode += arg.toString();
            continue;
        }

        const offset = 4*arg;
        
        set_js_cursor(offset + CODE_BEG);
        AST2JS[type(arg)!](arg);
        set_js_cursor(offset + CODE_END)
    }
}

export function ast2js(ast: AST) {

    new_jscode(ast.filename);

    w(0);

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