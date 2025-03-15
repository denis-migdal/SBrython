import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_TRYBLOCK_CATCH } from "@SBrython/sbry/ast2js/";
import { addChild, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    let nbChildren = 1;
    if( node.type !== undefined )
        nbChildren = 2;

    setType(dst, AST_CTRL_TRYBLOCK_CATCH);
    const coffset = addChild(dst, nbChildren);

    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    if( nbChildren === 2)
        convert_node(coffset+1, node.type, context);
    
    VALUES[dst] = node.name;
}