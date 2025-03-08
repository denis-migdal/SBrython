import { CONTROLFLOWS_FOR } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_body, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context): false|void {

    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range")
        return false;

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO

    setType(dst, CONTROLFLOWS_FOR);
    const coffset = addChild(dst, 2);

    convert_node(coffset  , node.iter, context);
    convert_body(coffset+1, node.body, context);

    VALUES[dst] = target;
}

convert.brython_name = "For";