import { w_node, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { AST_FCT_CALL_KEYWORD } from "@SBrython/sbry/ast2js/";
import { firstChild, nextSibling, NODE_ID, type, VALUES } from "@SBrython/sbry/dop";
import { ARGS_INFO, Callable, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

export function default_call(node: NODE_ID) {

    const meta = (VALUES[node] as Callable).__call__[ARGS_INFO];

    const coffset    = firstChild(node);

    w_node(coffset);
    w_str('(');

    //TODO: opti...
    let nb_call_args = 0;
    let cur = coffset;
    while( (cur = nextSibling(cur)) !== 0) ++nb_call_args;

    // nb_pos_call
    let nb_pos_call = nb_call_args;

    cur = coffset;
    for(let i = 0; i < nb_call_args; ++i) {
        cur = nextSibling(cur);

        if( type(cur) === AST_FCT_CALL_KEYWORD ) {
            nb_pos_call = i;
            break;
        }
    }

    // 1) Consume call pos (nb_pos_call) until max_pos
    let max_pos = meta.idx_end_pos;
    const vararg_array = max_pos === Number.POSITIVE_INFINITY && meta.has_kw;
    if( vararg_array )
        max_pos = meta.idx_vararg; // vararg_array + max_pos: can be precomputed ?

    const cutoff = Math.min(nb_pos_call, max_pos);
    cur = coffset;
    for(let i = 0; i < cutoff; ++i) {
        cur = nextSibling(cur);
        w_node(cur);
        w_str(", ");
    }

    const kw    : Record<string, NODE_ID> = {};
    const kwargs: Record<string, NODE_ID> = {};

    let call_has_kw     = false;
    let call_has_kwargs = false;

    const pos        = new Array(Math.max(meta.idx_vararg - cutoff,0));

    // 2) If (...pos, [vargars], ...)
    if(vararg_array) {
        const varg_start = meta.idx_vararg;
        const varg_nb    = nb_pos_call - varg_start;

        if( varg_nb > 0 ) { // we have varargs to write...

            w_str("[");

            cur = nextSibling(cur);
            w_node(cur);
            
            for(let i = 1; i < varg_nb; ++i) {
                w_str(", ");
                cur = nextSibling(cur);
                w_node(cur);
            }

            w_str("]");
        }
    } else {
        // WHY ???
        const args_names = meta.args_names;
        for(let i = cutoff; i < nb_pos_call; ++i) {
            cur = nextSibling(cur);
            kw[ args_names[i-1] ] = cur;
        }

        call_has_kw = cutoff !== nb_pos_call;
    }
    // 3) process call kw...
    const args_pos = meta.args_pos;

    for(let i = nb_pos_call; i < nb_call_args; ++i) {

        cur = nextSibling(cur);
        const name = VALUES[cur];
        const idx  = args_pos[ name ];

        if( idx >= 0 ) { // pos args given by kw...
            pos[idx - cutoff] = cur;
            continue;
        }

        call_has_kw = true;

        if( idx === -1)
            kw[name] = cur;
        else {
            kwargs[name] = cur;
            call_has_kwargs = true;
        }
    }

    // do not print useless "undefined"
    if( !call_has_kw && ! call_has_kwargs ) {
        let i;
        for(i = pos.length - 1; i >= 0; --i) {
            if( pos[i] !== undefined)
                break;
        }
        pos.length = i+1;
    }

    // write pos given by call kw...
    for(let i = 0; i < pos.length; ++i) {
        const arg = pos[i];
        if( arg === undefined )
            w_str("undefined, ");
        else {
            w_node(arg);
            w_str(", ");
        }
    }

    if( call_has_kw ) {
        w_str("{");
        for(let key in kw)
            w_sns(`${key}: `, kw[key], ", ");

        if( call_has_kwargs ) {
            w_str(`${meta.kwargs}: {`);
            for(let key in kwargs)
                w_sns(`${key}: `, kwargs[key], ", ");
            w_str("}");
        }

        w_str("},");
    }

    if( ! meta.has_kw && call_has_kwargs ) {
        w_str(`{`);
        for(let key in kwargs)
            w_sns(`${key}: `, kwargs[key], ", ");
        w_str("}");
    }

    w_str(')');
}

export default function ast2js(node: NODE_ID) {
    (VALUES[node] as Callable).__call__[WRITE_CALL]!(node);
}