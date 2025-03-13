import { BODY } from "@SBrython/core_modules/lists";
import { addChild, setType, type } from "@SBrython/dop";
import { Context, convert_node } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    setType(dst, BODY);

    const nbChildren = node.length;
    const coffset    = addChild(dst, nbChildren);

    for(let i = 0; i < nbChildren; ++i) {

        let cn = node[i];
        if(cn.constructor.$name === "Expr") // only found in body ?
            cn = cn.value;

        convert_node(i + coffset, cn, context);
    }
}