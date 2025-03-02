import { CONTROLFLOWS_TRYBLOCK_CATCH } from "core_modules/lists";
import { addChild, setType, VALUES } from "dop";
import { Context, convert_body, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    let nbChildren = 1;
    if( node.type !== undefined )
        nbChildren = 2;

    setType(dst, CONTROLFLOWS_TRYBLOCK_CATCH);
    const coffset = addChild(dst, nbChildren);

    convert_body(coffset, node.body, context);
    if( nbChildren === 2)
        convert_node(coffset+1, node.type, context);
    
    VALUES[dst] = node.name;
}

convert.brython_name = "ExceptHandler";