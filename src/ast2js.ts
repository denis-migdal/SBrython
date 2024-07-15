import { ASTNode, CodePos } from "structs/ASTNode";

export function ast2js(ast: ASTNode[]) {

	let js = "";
    let cursor = {line: 1, col: 0};
	for(let node of ast) {
		js += astnode2js(node, cursor);
        js +=    newline(node, cursor);
    }

	return js;
}

function update_end(node: ASTNode, js: string) {

    if( node.jscode!.end !== null)
        return;

    const start = node.jscode!.start;

    let line_count    = 0;
    let last_line_idx = 0;

    for(let i = 0; i < js.length; ++i)
        if(js[i] === '\n') {
            ++line_count;
            last_line_idx = i;
        }

    console.log(line_count, js.length);

    if(line_count === 0) {
        node.jscode!.end = {
            line: start.line,
            col : start.col + js.length
        }
        return;
    }

    node.jscode!.end = {
        line: start.line + line_count,
        col : js.length - last_line_idx
    }
}

export function newline(node: ASTNode, cursor: CodePos, indent_level: number = 0) {

    const indent = indent_level*4 + node.jscode!.start.col;

    ++cursor.line;
    cursor.col = indent;
    return "\n" + "".padStart(indent);
}

export function astnode2js(node: ASTNode, cursor: CodePos) {

    node.jscode = {
        start: {...cursor},
        end  : null as any
    }

    let js = node.toJS!();

    update_end(node, js);

    cursor.line = node.jscode!.end.line;
    cursor.col  = node.jscode!.end.col;
    
    return js;
}