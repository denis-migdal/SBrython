import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_IFBLOCK } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_CTRL_IFBLOCK);
    let coffset = addFirstChild(dst);

    // if
    convert_node(coffset, node.test, context);

    coffset = addSibling(coffset);
    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    // else if
    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 ) {

        // cur.orelse[0] is the body
        if( ! ("test" in cur.orelse[0]) ) { // final else
            coffset = addSibling(coffset);
            convert_node(coffset, cur.orelse, context)
            break;
        }

        cur = cur.orelse[0];

        coffset = addSibling(coffset);
        convert_node(coffset, cur.test, context);
        coffset = addSibling(coffset);
        Body(coffset, cur.body, context);

        if(__DEBUG__) set_py_code_from_list(coffset, cur.body);
    }
}