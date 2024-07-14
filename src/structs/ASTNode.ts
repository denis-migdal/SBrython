type CodePos = {
    line: number,
    col : number
}

type CodeRange = {
    start: CodePos,
    end  : CodePos
}

export class ASTNode {

	type    : string;
	value   : any;
	children: ASTNode[] = [];

    pycode: CodeRange;
    jscode?: CodeRange;

	constructor(line: any) {

        this.pycode = {
            start: {
                line: line.lineno ?? line.value.lineno, //TODO fix
                col: line.col_offset ?? line.value.col_offset
            },
            end: {
                line: line.end_lineno ?? line.value.end_lineno,
                col: line.end_col_offset ?? line.value.end_col_offset
            }
        }

        //TODO move...
		if( "test" in line) {

			this.type = "if"
			this.value = "";
			this.children = [new ASTNode({value:line.test}), ...line.body.map( (m:any) => new ASTNode(m) )];
			return;
		}

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

		if( "op" in value ) {
			this.type = "Operator";

			this.value = value.op.constructor.$name;

			this.children = [
				new ASTNode({value: value.left}),
				new ASTNode({value: value.right}),
			]

			return;
		}

		this.type = typeof value.value;
		this.value = value.value;
		if( this.type === "number")
			this.type = "integer"

		if( value.value instanceof Object && "value" in value.value) {
			this.type = "float";
			this.value = value.value.value;
		}
	}
}