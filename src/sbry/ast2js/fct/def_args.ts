import { set_js_cursor, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { CODE_BEG, CODE_END, firstChild, nextSibling, NODE_ID, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { AST_FCT_DEF_ARGS_KWARG, AST_FCT_DEF_ARGS_VARG } from "@SBrython/sbry/bry2sbry/functions/Args";
import { TYPEID_jsint } from "@SBrython/sbry/types";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { ARGS_INFO, Callable } from "@SBrython/sbry/types/utils/types";

export default function ast2js(node: NODE_ID) {
    
    const SType_fct = VALUES[node]! as Callable;

    const meta = SType_fct.__call__[ARGS_INFO];

    let kw_start = meta.idx_end_pos;
    if( kw_start === Number.POSITIVE_INFINITY )
        kw_start = meta.idx_vararg + 1;

    //TODO...

    let cur    = firstChild(node);
    let nbChildren = 0;
    while(cur !== 0) {
        ++nbChildren;
        cur = nextSibling(cur);
    }

    if( meta.kwargs !== undefined && kw_start === nbChildren - 1)
        ++kw_start;

    cur    = firstChild(node);

    let count = 0;
    while(cur !== 0) {

        //TODO...
        if( kw_start === count)
            w_str("{");

        ++count;

        write_arg(cur);

        w_str(", ");
        
        cur = nextSibling(cur);
    }

    if( kw_start < nbChildren)
        w_str('} = {}');
}

function write_arg(node: NODE_ID) {
    
    const offset = 4*(node as number);
    if( __DEBUG__ ) set_js_cursor(offset + CODE_BEG);

    const name = VALUES[node];
    const type_id = type(node);

    if( type_id === AST_FCT_DEF_ARGS_VARG ) {
        if( nextSibling(node) === 0 )
            w_str(`...${name}`);
        else
            w_str(`${name} = []`);
    } else if( type_id === AST_FCT_DEF_ARGS_KWARG ) {
        w_str(`${name} = {}`);
    } else if( firstChild(node) !== 0 ) {

        let defval: any = firstChild(node);
        if( resultType(defval) === TYPEID_jsint )
            defval = Number2Int(defval);

        w_str(`${name} = `);
        w_node(defval);
    }else {
        w_str(name);
    }

    if( __DEBUG__ ) set_js_cursor(offset + CODE_END);
}