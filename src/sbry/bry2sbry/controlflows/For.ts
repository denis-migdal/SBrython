import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_FOR, AST_CTRL_FOR_RANGE } from "@SBrython/sbry/ast2js/";
import { addChild, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_int } from "@SBrython/sbry/types";

export default function convert(dst: number, node: any, context: Context): false|void {

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO

    // FOR RANGE
    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range" ) {
    
        setType(dst, AST_CTRL_FOR);
        const coffset = addChild(dst, 2);
    
        convert_node(coffset  , node.iter, context);
    
        Body(coffset+1, node.body, context);
        if(__DEBUG__) set_py_code_from_list(coffset+1, node.body);
    
        VALUES[dst] = target;

        return;
    }

    context.local_symbols[node.value] = TYPEID_int;
    // TODO: jsint opti if this.value not used...

    const args = node.iter.args;

    setType(dst, AST_CTRL_FOR_RANGE);
    const nbChildren = args.length + 1;
    const coffset    = addChild(dst, nbChildren);

    Body(coffset, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset, node.body);

    for(let i = 1; i < nbChildren ; ++i)
        convert_node(i+coffset, args[i-1], context);

    VALUES[dst] = target;
}