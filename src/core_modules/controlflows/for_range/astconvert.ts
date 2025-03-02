import { CONTROLFLOWS_FOR_RANGE } from "core_modules/lists";
import { addChild, setType, VALUES } from "dop";
import { Context, convert_body, convert_node } from "py2ast";
import { STYPE_INT } from "structs/STypes";

export default function convert(dst: number, node: any, context: Context): false|void {

    if( node.iter.constructor.$name !== "Call" || node.iter.func.id !== "range")
        return false;

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    context.local_symbols[node.value] = STYPE_INT;
    // TODO: jsint opti if this.value not used...

    const args = node.iter.args;

    setType(dst, CONTROLFLOWS_FOR_RANGE);
    const nbChildren = args.length + 1;
    const coffset    = addChild(dst, nbChildren);

    convert_body(coffset, node.body, context);
    for(let i = 1; i < nbChildren ; ++i)
        convert_node(i+coffset, args[i-1], context);

    VALUES[dst] = target;
}

convert.brython_name = "For";