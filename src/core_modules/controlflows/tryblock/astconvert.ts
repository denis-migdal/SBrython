import { CONTROLFLOWS_TRYBLOCK } from "@SBrython/core_modules/lists";
import { addChild, setType } from "@SBrython/dop";
import { Context, convert_body, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    const nbChildren = node.handlers.length+1;

    setType(dst, CONTROLFLOWS_TRYBLOCK);
    const coffset = addChild(dst, nbChildren)

    // try body
    convert_body(coffset, node.body, context);

    for(let i = 1; i < nbChildren; ++i)
        convert_node(i+coffset, node.handlers[i-1], context);

}

convert.brython_name = "Try";