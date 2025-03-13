import Body from "@SBrython/bry2sbry/Body";
import { CONTROLFLOWS_TRYBLOCK_CATCH } from "@SBrython/core_modules/lists";
import { addChild, setType, VALUES } from "@SBrython/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/py2ast";

export default function convert(dst: number, node: any, context: Context) {

    let nbChildren = 1;
    if( node.type !== undefined )
        nbChildren = 2;

    setType(dst, CONTROLFLOWS_TRYBLOCK_CATCH);
    const coffset = addChild(dst, nbChildren);

    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    if( nbChildren === 2)
        convert_node(coffset+1, node.type, context);
    
    VALUES[dst] = node.name;
}