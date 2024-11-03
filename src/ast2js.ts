import { AST } from "py2ast";
import { ASTNode, CodePos } from "structs/ASTNode";

const cursor: { line: number, line_offset: number} = {
    line       : 0,
    line_offset: 0
};
let jscode: string;

export function jscode_cursor(): CodePos {
    return {
        line: cursor.line,
        col : jscode.length - cursor.line_offset
    }
}

function new_jscode(filename: string) {

    jscode  = `//# sourceURL=${filename}\n`;
    jscode += `const {_r_, _b_} = __SBRYTHON__;\n`;

    cursor.line = 3;
    cursor.line_offset = jscode.length;
}

type Printable = {toString(): string};

let indent = "    ";
let cur_indent_level = -1;
let cur_indent = "";

export const NL = {
    toString: function() {

        ++cursor.line;
        cursor.line_offset = jscode.length + 1;

        return "\n" + cur_indent;
    }
}
export const BB = {
    toString: function() {
        if( ++cur_indent_level > 0)
            cur_indent += indent;
        return "";
    }
}
export const BE = {
    toString: function() {
        --cur_indent_level;
        cur_indent = cur_indent.slice(0,-4);
        return "";
    }
}


export function r(...args: [TemplateStringsArray, ...(Printable|ASTNode)[]]) {
    return args;
}

export function wr(args: [TemplateStringsArray, ...(Printable|ASTNode)[]]) {
    if( typeof args === "string")
        return w(args);
    return wt(...args);
}

export function wt(str: TemplateStringsArray, ...args: (Printable|ASTNode)[]) {
    
    for(let i = 0; i < args.length; ++i) {
        jscode += str[i];
        w(args[i]);
    }

    jscode += str[args.length];
}

export function w(...args: (Printable|ASTNode)[]) {

    for(let i = 0; i < args.length; ++i) {

        let arg = args[i];

        if( Array.isArray(arg) ) { // likely a r``
            wr(arg as any);
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

        const start = jscode_cursor();

        arg.write!();

        arg.jscode = {
            start,
            end: jscode_cursor()
        }
    }
}

export function ast2js(ast: AST) {

    new_jscode(ast.filename);

    w(ast.body);

    // TODO: better export strategy (?)
    jscode += `\nconst __exported__ = {};\n`;

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