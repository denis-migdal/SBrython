import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_ELIF, AST_CTRL_ELSE, AST_CTRL_IF } from "@SBrython/sbry/ast2js/";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    setType(dst, AST_CTRL_IF);
    let coffset = addFirstChild(dst);

    // if
    convert_node(coffset, node.test, context);

    coffset = addSibling(coffset);
    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    let ifblock_cur = dst;

    // else if
    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 ) {

        // cur.orelse[0] is the body
        if( ! ("test" in cur.orelse[0]) ) { // final else

            ifblock_cur = addSibling(ifblock_cur);
            setType(ifblock_cur, AST_CTRL_ELSE);
            
            // body
            const id = addFirstChild(ifblock_cur);
            Body(id, cur.orelse, context );
            if(__DEBUG__) set_py_code_from_list(ifblock_cur, cur.orelse);
            
            break;
        }

        cur = cur.orelse[0];

        ifblock_cur = addSibling(ifblock_cur);
        setType(ifblock_cur, AST_CTRL_ELIF);
        
        // body
        const first = addFirstChild(ifblock_cur);
        convert_node(first, cur.test, context); // cond

        const id = addSibling(first);
        Body(id, cur.body, context);
        if(__DEBUG__) set_py_code_from_list(id, cur.body);
    }
}