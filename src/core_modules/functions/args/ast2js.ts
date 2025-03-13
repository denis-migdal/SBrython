import { set_js_cursor, w, wr, wt } from "@SBrython/ast2js";
import { CODE_BEG, CODE_END, firstChild, nbChild, resultType, type, VALUES } from "@SBrython/dop";
import { binary_jsop, Number2Int } from "@SBrython/structs/BinaryOperators";
import { STypeFct } from "@SBrython/structs/SType";
import { STYPE_JSINT } from "@SBrython/structs/STypes";
import { FUNCTIONS_ARGS_KWARG, FUNCTIONS_ARGS_VARG } from "@SBrython/bry2sbry/functions/Args";

export default function ast2js(node: number) {
    
    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    const SType_fct = VALUES[node]! as STypeFct;

    const meta = SType_fct.__call__;

    let kw_start = meta.idx_end_pos;
    if( kw_start === Number.POSITIVE_INFINITY )
        kw_start = meta.idx_vararg + 1;

    if( meta.kwargs !== undefined && kw_start === nbChildren - 1)
        ++kw_start;
    
    for(let i = 0 ; i < nbChildren ; ++i) {
        if( i !== 0)
            w(", ");

        if( kw_start === i)
            w("{");

        const isLast = i === meta.idx_vararg && i === nbChildren-1;
        write_arg(i + coffset, isLast);
    }

    if( kw_start < nbChildren)
        w('} = {}');
}

function write_arg(node: number, isLast: boolean) {
    
    const offset = 4*node;
    if( __DEBUG__ ) set_js_cursor(offset + CODE_BEG);

    const name = VALUES[node];
    const type_id = type(node);

    if( type_id === FUNCTIONS_ARGS_VARG ) {
        if( isLast )
            wt`...${name}`;
        else
            wr( binary_jsop(node, name, '=', "[]") );
    } else if( type_id === FUNCTIONS_ARGS_KWARG ) {
        wr( binary_jsop(node, name, '=', "{}") );
    } else if( nbChild(node) === 1 ) {

        let defval: any = firstChild(node);
        if( resultType(defval) === STYPE_JSINT )
            defval = Number2Int(defval);

        wr( binary_jsop(node, name, '=', defval) );
    }else {
        w(name);
    }

    if( __DEBUG__ ) set_js_cursor(offset + CODE_END);
}