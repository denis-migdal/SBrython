import { r, wr } from "ast2js";
import { FUNCTIONS_CALL_KEYWORD } from "core_modules/lists";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { STypeFct } from "structs/SType";
import { STypes } from "structs/STypes";

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

export function default_call(node: ASTNode) {

    const meta = (VALUES[node.id] as STypeFct).__call__;

    let kw_pos = node.children.length;
    for(let i = 1; i < node.children.length; ++i)
        if(node.children[i].type_id === FUNCTIONS_CALL_KEYWORD) {
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
    
    const kw    : Record<string, ASTNode> = {};
    const kwargs: Record<string, ASTNode> = {};

    let has_kw = false;

    if( meta.has_kw && meta.idx_end_pos === Number.POSITIVE_INFINITY ) {

        const cutoff = Math.min(kw_pos, meta.idx_vararg);

        for(let i = 1; i < cutoff; ++i)
            pos[i-1] = node.children[i];

        if( meta.idx_vararg+1 !== kw_pos )
            pos[meta.idx_vararg] = join(["[", join(node.children.slice(meta.idx_vararg+1,kw_pos)), "]"], "");
    } else {

        const cutoff = Math.min(kw_pos, nb_pos+1);

        for(let i = 1; i < cutoff; ++i)
            pos[i-1] = node.children[i];

        const args_names = meta.args_names;
        for(let i = cutoff; i < kw_pos; ++i)
            kw[ args_names[i-1] ] = node.children[i];

        has_kw = cutoff !== kw_pos;
    }

    let has_kwargs = false;

    const args_pos = meta.args_pos;
    

    for(let i = kw_pos; i < node.children.length; ++i) {

        const arg  = node.children[i];
        const name = VALUES[arg.id];
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

    return r`${node.children[0]}(${join(pos)})`; // args ?
}

export default function ast2js(node: ASTNode) {
    wr( (VALUES[node.id] as STypeFct).__call__.substitute_call!(node) );
}