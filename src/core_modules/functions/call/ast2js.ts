import { r, wr } from "ast2js";
import { FUNCTIONS_CALL_KEYWORD } from "core_modules/lists";
import { firstChild, nbChild, type, VALUES } from "dop";
import { STypeFct } from "structs/SType";

function print_obj(obj: Record<string, any>) {

    const keys = Object.keys(obj);
    if(keys.length === 0)
        return [[]];

    const str = new Array(keys.length+1);
    str[0] = `{${keys[0]}: `;
    let i;
    for(i = 1; i < keys.length; ++i)
        str[i]  = `, ${keys[i]}: `;

    str[i] = "}";

    return [str, ...Object.values(obj)];
}

function join(data: any[], sep=", ") {

    if(data.length === 0)
        return [[""]];

    const str = new Array(data.length+1);
    str[0] = "";
    let i;
    for(i = 1; i < data.length; ++i)
        str[i] = sep;
    str[i] = "";

    return [str, ...data];
}

export function default_call(node: number) {

    const meta = (VALUES[node] as STypeFct).__call__;

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    let kw_pos = nbChildren;
    for(let i = 1; i < nbChildren; ++i)
        if( type( i + coffset) === FUNCTIONS_CALL_KEYWORD) {
            kw_pos = i;
            break;
        }

    let nb_pos = meta.idx_end_pos;
    if( nb_pos === Number.POSITIVE_INFINITY)
        nb_pos = Math.max(meta.idx_vararg, kw_pos-1);

    let pos_size = nb_pos+1;
    if( meta.has_kw && meta.idx_end_pos === Number.POSITIVE_INFINITY )
        pos_size = meta.idx_vararg+2;
    let pos = new Array(pos_size);
    
    const kw    : Record<string, number> = {};
    const kwargs: Record<string, number> = {};

    let has_kw = false;

    if( meta.has_kw && meta.idx_end_pos === Number.POSITIVE_INFINITY ) {

        const cutoff = Math.min(kw_pos, meta.idx_vararg);

        for(let i = 1; i < cutoff; ++i)
            pos[i-1] = i + coffset;

        const varg_start = meta.idx_vararg+1;
        const varg_nb = kw_pos - varg_start;
        if( varg_nb !== 0 ) {

            // template string... [ [..str], ...idx ]
            // => [ (a), (b), (c), (d) ] ...
            let str = new Array(varg_nb + 1);
            let idx = new Array(varg_nb + 1);

            str[0]       = "[";

            idx[0]       = str;
            idx[1]       = coffset + varg_start;
            for(let i = 1; i < varg_nb; ++i) {
                str[i]  = ", ";
                idx[i+1]= coffset + varg_start + i;
            }

            str[varg_nb] = "]"; // prevents sparse array ?
        }
    } else {

        const cutoff = Math.min(kw_pos, nb_pos+1);

        for(let i = 1; i < cutoff; ++i)
            pos[i-1] = i + coffset;

        const args_names = meta.args_names;
        for(let i = cutoff; i < kw_pos; ++i)
            kw[ args_names[i-1] ] = i + coffset;

        has_kw = cutoff !== kw_pos;
    }

    let has_kwargs = false;

    const args_pos = meta.args_pos;
    

    for(let i = kw_pos; i < nbChildren; ++i) {

        const arg  = i + coffset;
        const name = VALUES[arg];
        const idx  = args_pos[ name ];

        if( idx >= 0 ) {
            pos[idx] = arg;
            continue;
        }

        has_kw = true;

        if( idx === -1)
            kw[name] = arg;
        else {
            kwargs[name] = arg;
            has_kwargs = true;
        }
    }

    let obj: Record<string, any> = kw;
    //TODO: only the ones at -1...
    if( has_kwargs && ! meta.has_kw ){
        obj = kwargs;
    } else if( has_kwargs ) {
        obj[meta.kwargs!] = print_obj(kwargs);
    }

    if( has_kw )
        pos[pos.length-1] = print_obj(obj);
    else {
        while(pos.length > 0 && pos[pos.length-1] === undefined)
            --pos.length;
    }

    return r`${coffset}(${join(pos)})`; // args ?
}

export default function ast2js(node: number) {
    wr( (VALUES[node] as STypeFct).__call__.substitute_call!(node) );
}