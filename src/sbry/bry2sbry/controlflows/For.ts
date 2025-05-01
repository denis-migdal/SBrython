import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CTRL_FOR, AST_CTRL_FOR_RANGE } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, NODE_ID, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_int } from "@SBrython/sbry/types/list";

export default function convert(dst: NODE_ID, node: any, context: Context): false|void {

    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO

    // FOR RANGE
    if( node.iter.constructor.$name === "Call" && node.iter.func.id === "range" ) {
    
        setType(dst, AST_CTRL_FOR);
        const coffset = addFirstChild(dst);
    
        convert_node(coffset  , node.iter, context);
    
        const body = addSibling(coffset);
        Body(body, node.body, context);
        if(__SBRY_MODE__ === "dev") set_py_code_from_list(body, node.body);
    
        VALUES[dst] = target;

        return;
    }

    context.local_symbols[node.value] = TYPEID_int;
    // TODO: jsint opti if this.value not used...

    const args = node.iter.args;

    setType(dst, AST_CTRL_FOR_RANGE);

    let cur    = addFirstChild(dst);
    Body(cur, node.body, context);
    if(__SBRY_MODE__ === "dev") set_py_code_from_list(cur, node.body);

    const nbChildren = args.length;
    for(let i = 1; i < nbChildren ; ++i) {
        cur = addSibling(cur);
        convert_node(cur, args[i-1], context);
    }

    VALUES[dst] = target;
}