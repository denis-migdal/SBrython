import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "literals.f-string", null, null, [
        ...node.values.map( (e:any) => convert_node(e, context) )
    ]);
}

convert.brython_name = "JoinedStr";