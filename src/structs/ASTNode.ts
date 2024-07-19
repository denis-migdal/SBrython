export type CodePos = {
    line: number,
    col : number
}

export type CodeRange = {
    start: CodePos,
    end  : CodePos
}

export class ASTNode {

	type    : string;
	value   : any;
	children: ASTNode[] = [];
	result_type: string|null = null;

    pycode: CodeRange;
    jscode?: CodeRange;

	toJS?: (this: ASTNode, cursor: CodePos) => string;

	constructor(brython_node: any, type: string, result_type: string|null, _value: any = null, children: ASTNode[] = []) {

		this.type   = type;
		this.result_type = result_type;
		this.value  = _value;
		this.children = children!;
		this.pycode = {
			start: {
				line: brython_node.lineno,
				col: brython_node.col_offset
			},
			end: {
				line: brython_node.end_lineno,
				col: brython_node.end_col_offset
			}
		}
	}
}