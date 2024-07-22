import { AST } from "py2ast";
import { ASTNode, CodePos } from "structs/ASTNode";

export function ast2js(ast: AST) {

	let js = `//# sourceURL=${ast.filename}\n`;
    let cursor = {line: 2, col: 0};
	for(let node of ast.nodes) {
		js += astnode2js(node, cursor);
        js +=    newline(node, cursor);
    }

	return js;
}


export function r(str: TemplateStringsArray, ...args:any[]) {
    return [str, args];
}

export function toJS( str: ReturnType<typeof r>|string|ASTNode, cursor: CodePos ) {

    if( typeof str === "string") {
        cursor.col += str.length;
        return str;
    }
    if( str instanceof ASTNode) {
        return astnode2js(str, cursor);
    }

    let js = "";

    let e: any;
    let s: string = "";

    for(let i = 0; i < str[1].length; ++i) {

        s = str[0][i];
        js += s;
        cursor.col += s.length;

        e = str[1][i];
        if( e instanceof ASTNode) {
            js += astnode2js(e, cursor);
        } else {
            s = `${e}`;
            js += s;
            cursor.col += s.length;
        }
    }

    s = str[0][str[1].length];
    js += s;
    cursor.col += s.length;

    return js;
}

//TODO: move2core_modules ?
export function body2js(node: ASTNode, cursor: CodePos, idx = 0) {
    
    const start = {...cursor};

    let js = "{";
    const body = node.children[idx];//body: ASTNode[];

    for(let i = 0; i < body.children.length; ++i) {
        js += newline(node, cursor, 1);
        js += astnode2js(body.children[i], cursor)
    }

    js += newline(node, cursor);
    js += "}";
    cursor.col += 1;

    body.jscode = {
        start: start,
        end  : {...cursor}
    }

    return js;
}

//TODO: move2core_modules ?
export function args2js(node: ASTNode, cursor: CodePos) {
    
    const start = {...cursor};

    let js = "(";
    cursor.col += 1;

    const args = node.children[0];
    
    for(let i = 0 ; i < args.children.length; ++i) {
        if( i !== 0) {
            js += ",";
            ++cursor.col;
        }

        js += arg2js(args.children[i], cursor);
    }

    js += ")";
    cursor.col += 1;

    args.jscode = {
        start: start,
        end  : {...cursor}
    }

    return js;
}

export function arg2js(node: ASTNode, cursor: CodePos) {
    
    const start = {...cursor};

    let js = node.value;
    cursor.col += js.length;

    node.jscode = {
        start: start,
        end  : {...cursor}
    }

    return js;
}

export function newline(node: ASTNode, cursor: CodePos, indent_level: number = 0) {

    let base_indent = node.jscode!.start.col;
    if( ["controlflows.else", "controlflows.elif", "controlflows.catchblock"].includes(node.type) ) {
       --base_indent;
    }

    const indent = indent_level*4 + base_indent;

    ++cursor.line;
    cursor.col = indent;
    return "\n" + "".padStart(indent);
}

export function astnode2js(node: ASTNode, cursor: CodePos) {

    node.jscode = {
        start: {...cursor},
        end  : null as any
    }

    let js = node.toJS!(cursor);

    node.jscode.end = {...cursor}
    
    return js;
}