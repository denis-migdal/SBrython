import { set_py_code } from "ast2js";
import { LITERALS_F_STRING } from "core_modules/lists";
import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";

export default function convert(node: any, context: Context) {
    
    const ast = new ASTNode(LITERALS_F_STRING, 0, [
        ...node.values.map( (e:any) => convert_node(e, context) )
    ]);
        
    set_py_code(4*ast.id, node);

    return ast;
}

convert.brython_name = "JoinedStr";