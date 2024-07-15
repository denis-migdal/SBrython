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

	toJS?: (this: ASTNode) => string;

	constructor(brython_node: any, type: string, _value?: any, children: ASTNode[] = []) {

		this.type   = type;
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
/*
		const value = line.value;

		if( value === undefined) {
			this.type = "pass";
			this.value = "";
			return;
		}

		if( "comparators" in value) {

			this.type = "Operator";
			this.value = "Equals";
			this.children = [
				new ASTNode({value: value.left}),
				new ASTNode({value: value.comparators[0]})
			];

			return;
		}

		if( value.value instanceof Object && "value" in value.value) {
			this.type = "float";
			this.value = value.value.value;
		}*/
	}
}