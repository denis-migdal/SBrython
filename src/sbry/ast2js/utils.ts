// must NOT depends on list.
import AST2JS, { AST_CLASSDEF, AST_DEF_FCT, AST_OP_ASSIGN_INIT, AST_SYMBOL } from "./list"; // required for correct type deduction...

import { ARRAY_TYPE, CODE_BEG, CODE_BEG_COL, CODE_BEG_LINE, CODE_COL, CODE_END, CODE_END_COL, CODE_END_LINE, CODE_LINE, firstChild, JS_CODE, nextSibling, NODE_ID, type, VALUES } from "../dop";

export const CURSOR = __SBRY_MODE__ === "dev" ? new ARRAY_TYPE(2) : null as unknown as InstanceType<typeof ARRAY_TYPE>;

export let jscode: string;

import type { AST } from "@SBrython/sbry/py2ast";

export function ast2js(ast: AST) {

    new_jscode();

    w_node(0);

    const exported = [];
    let cur = firstChild(0);

    let node_type;
    while( cur !== 0) {

        node_type = type(cur);

        if( node_type === AST_CLASSDEF || node_type === AST_DEF_FCT)
            exported.push( VALUES[cur]);
        if( node_type === AST_OP_ASSIGN_INIT ) {
            const child = firstChild(cur);
            if( type(child) === AST_SYMBOL)
                exported.push( VALUES[child] );
        }

        cur = nextSibling(cur);
    }

    if( __SBRY_EXPORT__ === "GLOBAL" )
        jscode += `\nglobalThis.__SBRY_LAST_EXPORTED__ = {${exported.join(', ')}};\n`;
    if( __SBRY_EXPORT__ === "SBRY")
        jscode += `\n__SBRY__.register("${ast.filename}", {${exported.join(', ')}});\n`;
    if( __SBRY_EXPORT__ === "ES6" )
        jscode += `\nexport {${exported.join(', ')}};\n`;

	return jscode;
}

function new_jscode() {

    jscode = "";

    let nbLines = 1;

    if( __SBRY_COMPAT__ !== "NONE") {
        if( __SBRY_EXPORT__ === "ES6" ) {
            jscode += `import __SBRY__ from "@SBrython";\n`;
            ++nbLines;
        }

        if( __SBRY_EXPORT__ !== "NONE") {
            jscode += `const {_r_, _sb_} = __SBRY__;\n`;
            ++nbLines;
        }
    }

    if(__SBRY_MODE__ === "dev") {
        CURSOR[CODE_LINE] = nbLines;
        CURSOR[CODE_COL] = jscode.length;
    }
}

export function buildJSCode(id: NODE_ID) {
    const offset = 4*(id as number);
    
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

export function hasJSCursor(node: NODE_ID) {
    return JS_CODE[(node as any)*4 + CODE_LINE] !== 0;
}

export function set_js_cursor(idx: number) {
    JS_CODE[idx + CODE_LINE] = CURSOR[CODE_LINE];
    JS_CODE[idx + CODE_COL ] = jscode!.length - CURSOR[CODE_COL];
}
// ================== INDENT ======================


let indent = "    ";
let cur_indent_level = -1;
//let cur_indent = "";

const indents = __SBRY_MODE__ === "dev" ? [
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

    if( __SBRY_MODE__ === "dev" ) {
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

// ================== WRITE ======================
export function w_str(str: string) {
    jscode += str;
}
export function w_node(node: NODE_ID) {
    if( __SBRY_MODE__ === "dev" ) {
        const has = hasJSCursor(node);
        if( ! has ) set_js_cursor(4*(node as number) + CODE_BEG);
        AST2JS[type(node)!](node);
        if( ! has ) set_js_cursor(4*(node as number) + CODE_END);
    } else {
        AST2JS[type(node)!](node);
    }
}

type W_SNS = [string, NODE_ID, string]
    | [string, NODE_ID, string, NODE_ID, string]
    | [string, NODE_ID, string, NODE_ID, string, NODE_ID, string]
    | [string, NODE_ID, string, NODE_ID, string, NODE_ID, string, NODE_ID, string];

export function w_sns(...args: W_SNS) { //TODO: alternate

    jscode += args[0];

    for(let i = 1; i < args.length; i+=2) {

        const node = args[i] as NODE_ID;

        if( __SBRY_MODE__ === "dev" ) {
            const has = hasJSCursor(node);
            if( ! has ) set_js_cursor(4*(node as number) + CODE_BEG);
            AST2JS[type(node)!](node);
            if( ! has ) set_js_cursor(4*(node as number) + CODE_END);
        } else {
            AST2JS[type(node)!](node);
        }

        jscode += args[i+1] as string;
    }
}