import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_TRYBLOCK_CATCH } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_CTRL_TRYBLOCK_CATCH);

    const coffset = addFirstChild(dst);
    Body(coffset, node.body, context);
    if(__SBRY_MODE__ === "dev") set_py_code_from_list(coffset, node.body);

    if( node.type !== undefined ) {
        const cur = addSibling(coffset);
        convert_node(cur, node.type, context);
    }
    
    VALUES[dst] = node.name;
}