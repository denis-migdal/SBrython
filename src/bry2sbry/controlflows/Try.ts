import Body from "@SBrython/bry2sbry/Body";
import { CONTROLFLOWS_TRYBLOCK } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/py2ast";
import ExceptHandler from "./ExceptHandler";

export default function convert(dst: number, node: any, context: Context) {

    const nbChildren = node.handlers.length+1;

    setType(dst, CONTROLFLOWS_TRYBLOCK);
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