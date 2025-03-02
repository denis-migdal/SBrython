import { STypeObj } from "./SType";

export class ASTNode {

	static NEXT_AST_NODE_ID = 0;

	id         : number;
	type_id    : number; // node_type_id (!!!)
	result_type: number = 0; //TODO: number then type system...
	parent_op_priority: number = 0;

	// soon ^^
	children: ASTNode[] = []; // use id....

	constructor(type_id: number, result_type: number = 0, children: ASTNode[] = []) {

		this.id = ASTNode.NEXT_AST_NODE_ID++;
		this.type_id = type_id;
		this.result_type = result_type;
		
		this.children = children!;
	}
}