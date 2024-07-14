import { ASTNode, CodePos } from "structs/ASTNode";

export function ast2js(ast: ASTNode[]) {

	let js = "";
    let cursor = {line: 1, col: 0};
	for(let node of ast) {
		js += astnode2js(node, cursor) + "\n"
        ++cursor.line;
    }

	return js;
}


export function astnode2js(node: ASTNode, start: CodePos) {

    node.jscode = {
        start: {...start},
        end  : null as any
    }

    let js = node.toJS!();
    
    /*else if(node.type === "float")
        js = node.value;
    else if(node.type === "if") //TODO...
        js = `if( ${convert_astnode2js(node.children[0])} ) {
    ${node.children.slice(1).map( e => convert_astnode2js(e)).join("\n")}    
    }`;
    else
        js = "";*/
    
    node.jscode.end = {
        line: start.line,
        col : start.col + js.length
    }
    
    return js;
}