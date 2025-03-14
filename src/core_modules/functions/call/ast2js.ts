import { r, w_node, w_sns, w_str } from "@SBrython/ast2js";
import { FUNCTIONS_CALL_KEYWORD } from "@SBrython/core_modules/lists";
import { firstChild, nbChild, type, VALUES } from "@SBrython/dop";
import { ARGS_INFO, Callable, Fct, WRITE_CALL } from "@SBrython/types/utils/types";

export function default_call(node: number) {

    const meta = (VALUES[node] as Callable).__call__[ARGS_INFO];

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    w_node(coffset);
    w_str('(');

    const nb_call_args = nbChildren - 1; // could have short if nb_call_args = 0...
    const call_args_offset  = coffset + 1;

    // nb_pos_call
    let nb_pos_call = nb_call_args;
    for(let i = 0; i < nb_call_args; ++i)
        if( type( i + call_args_offset) === FUNCTIONS_CALL_KEYWORD) {
            nb_pos_call = i;
            break;
        }

    // 1) Consume call pos (nb_pos_call) until max_pos
    let max_pos = meta.idx_end_pos;
    const vararg_array = max_pos === Number.POSITIVE_INFINITY && meta.has_kw;
    if( vararg_array )
        max_pos = meta.idx_vararg; // vararg_array + max_pos: can be precomputed ?

    const cutoff = Math.min(nb_pos_call, max_pos);
    for(let i = 0; i < cutoff; ++i) {
        w_node(i + coffset + 1);
        w_str(", ");
    }

    const kw    : Record<string, number> = {};
    const kwargs: Record<string, number> = {};

    let call_has_kw     = false;
    let call_has_kwargs = false;

    const pos        = new Array(Math.max(meta.idx_vararg - cutoff,0));

    // 2) If (...pos, [vargars], ...)
    if(vararg_array) {
        const varg_start = meta.idx_vararg;
        const varg_nb    = nb_pos_call - varg_start;

        if( varg_nb > 0 ) { // we have varargs to write...

            w_str("[");

            w_node(varg_start + call_args_offset);
            
            for(let i = 1; i < varg_nb; ++i) {
                w_str(", ");
                w_node(i + varg_start + call_args_offset );
            }

            w_str("]");
        }
    } else {
        // WHY ???
        const args_names = meta.args_names;
        for(let i = cutoff; i < nb_pos_call; ++i)
            kw[ args_names[i-1] ] = i + coffset;

        call_has_kw = cutoff !== nb_pos_call;
    }
    // 3) process call kw...
    const args_pos = meta.args_pos;

    for(let i = nb_pos_call; i < nb_call_args; ++i) {

        const arg  = i + coffset;
        const name = VALUES[arg];
        const idx  = args_pos[ name ];

        if( idx >= 0 ) { // pos args given by kw...
            pos[idx - cutoff] = arg;
            continue;
        }

        call_has_kw = true;

        if( idx === -1)
            kw[name] = arg;
        else {
            kwargs[name] = arg;
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

export default function ast2js(node: number) {
    (VALUES[node] as Callable).__call__[WRITE_CALL]!(node);
}