import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_TRYBLOCK } from "@SBrython/sbry/ast2js/";
import { addChild, setType } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/py2ast";
import ExceptHandler from "./ExceptHandler";

export default function convert(dst: number, node: any, context: Context) {

    const nbChildren = node.handlers.length+1;

    setType(dst, AST_CTRL_TRYBLOCK);
    const coffset = addChild(dst, nbChildren)

    // try body
    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    for(let i = 1; i < nbChildren; ++i) {
        ExceptHandler(i+coffset, node.handlers[i-1], context);
        if(__DEBUG__) set_py_code_from_list(i+coffset, node.handlers[i-1]);
    }
    //TODO: finally ?
}