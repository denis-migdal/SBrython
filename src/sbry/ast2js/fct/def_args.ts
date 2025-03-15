import { set_js_cursor, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { CODE_BEG, CODE_END, firstChild, nbChild, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { AST_FCT_DEF_ARGS_KWARG, AST_FCT_DEF_ARGS_VARG } from "@SBrython/sbry/bry2sbry/functions/Args";
import { TYPEID_jsint } from "@SBrython/sbry/types";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { ARGS_INFO, Callable } from "@SBrython/sbry/types/utils/types";

export default function ast2js(node: number) {
    
    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    const SType_fct = VALUES[node]! as Callable;

    const meta = SType_fct.__call__[ARGS_INFO];

    let kw_start = meta.idx_end_pos;
    if( kw_start === Number.POSITIVE_INFINITY )
        kw_start = meta.idx_vararg + 1;

    if( meta.kwargs !== undefined && kw_start === nbChildren - 1)
        ++kw_start;
    
    for(let i = 0 ; i < nbChildren ; ++i) {
        if( i !== 0)
            w_str(", ");

        if( kw_start === i)
            w_str("{");

        const isLast = i === meta.idx_vararg && i === nbChildren-1;
        write_arg(i + coffset, isLast);
    }

    if( kw_start < nbChildren)
        w_str('} = {}');
}

function write_arg(node: number, isLast: boolean) {
    
    const offset = 4*node;
    if( __DEBUG__ ) set_js_cursor(offset + CODE_BEG);

    const name = VALUES[node];
    const type_id = type(node);

    if( type_id === AST_FCT_DEF_ARGS_VARG ) {
        if( isLast )
            w_str(`...${name}`);
        else
            w_str(`${name} = []`);
    } else if( type_id === AST_FCT_DEF_ARGS_KWARG ) {
        w_str(`${name} = {}`);
    } else if( nbChild(node) === 1 ) {

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