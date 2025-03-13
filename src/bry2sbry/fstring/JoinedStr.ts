import { LITERALS_F_STRING } from "@SBrython/core_modules/lists";
import { addChild, setResultType, setType } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";
import { STYPE_STR } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, LITERALS_F_STRING);
    setResultType(dst, STYPE_STR);

    const nbChildren = node.values.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i) {
        console.warn( node.values[i].constructor.$name); //TODO: not used yet.
        convert_node(i + coffset, node.values[i], context);
    }
}