import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {

    return new ASTNode(node, "keywords.import", null, node.module,
        node.names.map( (n:any) => convert_node(n, context) )
    );
}

convert.brython_name = ["Import", "ImportFrom"];