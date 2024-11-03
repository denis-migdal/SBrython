import { Context, convert_node, list2astnode } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct } from "structs/SType";

export default function convert(node: any, context: Context) {

    const lines = new Array(node.length)
    for(let i = 0; i < node.length; ++i)
        lines[i] = convert_node(node[i], context);

    for(let i = 0; i < lines.length; ++i) {
        if( lines[i].type !== "functions.def")
            continue;

        const meta = (lines[i].result_type! as STypeFct ).__call__;
        if( meta.generate !== undefined )
            meta.return_type(); // meh.
    }

    return new ASTNode(list2astnode(node), "body", null, null, lines);
}

convert.brython_name = "Body";