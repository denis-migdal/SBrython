import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_TRYBLOCK } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType } from "@SBrython/sbry/dop";
import { Context, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";
import ExceptHandler from "./ExceptHandler";

export default function convert(dst: NODE_ID, node: any, context: Context) {

    const nbChildren = node.handlers.length+1;

    setType(dst, AST_CTRL_TRYBLOCK);
    let cur = addFirstChild(dst)

    // try body
    Body(cur, node.body, context);
    if(__DEBUG__) set_py_code_from_list(cur, node.body);

    for(let i = 1; i < nbChildren; ++i) {
        cur = addSibling(cur);
        ExceptHandler(cur, node.handlers[i-1], context);
        if(__DEBUG__) set_py_code_from_list(cur, node.handlers[i-1]);
    }
    //TODO: finally ?
}