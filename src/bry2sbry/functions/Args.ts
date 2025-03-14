import { Context, convert_node, set_py_code, set_py_from_beg_end } from "@SBrython/py2ast";
import { FUNCTIONS_ARGS } from "@SBrython/core_modules/lists";
import { addChild, CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, PY_CODE, resultType, setResultType, setType, type, VALUES } from "@SBrython/dop";
import { TYPEID_int, TYPEID_jsint, TYPEID_NotImplementedType } from "@SBrython/types";
import { ARGS_INFO, Callable } from "@SBrython/types/utils/types";

//TODO: fake node...
export default function convert() {
    // args node doesn't exist...
    return;
}

export const FUNCTIONS_ARGS_POSONLY = 0;
export const FUNCTIONS_ARGS_KWARG   = 1;
export const FUNCTIONS_ARGS_KWONLY  = 2;
export const FUNCTIONS_ARGS_VARG    = 3;
export const FUNCTIONS_ARGS_POS     = 4;


convert.brython_name = "arguments";

export function convert_args(dst: number, node: any, SType_fct: Callable, context: Context) {

    const meta = SType_fct.__call__[ARGS_INFO];

    // compute total args...
    const _args = node.args;
    const has_vararg = _args.vararg !== undefined;
    const has_kwarg  = _args.kwarg  !== undefined;
    const args_pos   = meta.args_pos;
    const args_names = meta.args_names;

    const total_args = _args.posonlyargs.length
                     + _args.args.length
                     + +has_vararg
                     + _args.kwonlyargs.length
                     + +has_kwarg;

    setType(dst, FUNCTIONS_ARGS);

    const coffset = addChild(dst, total_args); // args

    const pos_defaults = node.args.defaults;
    const posonly = _args.posonlyargs;
    const pos     = _args.args;

    // posonly
    let doffset = pos_defaults.length - posonly.length - pos.length;
    for(let i = 0; i < posonly.length; ++i ) {
        convert_arg(i + coffset, posonly[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POSONLY, context);
        context.local_symbols[posonly[i].arg] = resultType(i+coffset);
    }

    // pos
    let offset = posonly.length;
      doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i ) {
        
        convert_arg(offset + coffset, pos[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POS, context);
        
        args_names[offset++] = pos[i].arg;
    }

    meta.idx_vararg = offset;

    // vararg
    if( has_vararg ) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;

        convert_arg(offset + coffset, _args.vararg, undefined, FUNCTIONS_ARGS_VARG, context);
        
        ++offset;
    } else {
        
        meta.idx_end_pos = offset;

        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || total_args !== offset;

        if( nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others)
            meta.idx_end_pos -= nb_pos_defaults;
    }

    let cut_off   = meta.idx_end_pos;
    if( cut_off === Number.POSITIVE_INFINITY)
        cut_off = meta.idx_vararg;
    for(let i = posonly.length; i < cut_off; ++i)
        args_pos[VALUES[i + coffset]] = i;

    const end = meta.idx_vararg - cut_off;
    for(let i = 0; i < end; ++i)
        args_pos[VALUES[i + coffset]] = -1;

    //TODO: idx_end_pos (if default and no idx_vararg)

    // kwonly
    const kwonly      = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;

    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;

    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i ) {
        
        convert_arg(offset + coffset, kwonly[i], kw_defaults[i], FUNCTIONS_ARGS_KWONLY, context);
        
        args_pos[kwonly[i].arg] = -1;

        ++offset;
    }

    // kwarg
    if( has_kwarg ) {
        
        convert_arg(offset + coffset, _args.kwarg, undefined, FUNCTIONS_ARGS_KWARG, context);

        meta.kwargs = _args.kwarg.arg;

        ++offset;
    }

    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */

    //TODO...

    VALUES[dst] = SType_fct;
    
    if( __DEBUG__ ) {
        if( total_args !== 0) {

            set_py_from_beg_end(dst, coffset, coffset + total_args - 1);

        } else {
            // an estimation...
            const col = node.col_offset + 4 + node.name.length + 1;

            const py_offset = 4*dst;
            PY_CODE[ py_offset + CODE_BEG_LINE ] = PY_CODE[ py_offset + CODE_END_LINE ] = node.lineno;
            PY_CODE[ py_offset + CODE_BEG_COL  ] = PY_CODE[ py_offset + CODE_END_COL  ] = col;
        }
    }
}
export function convert_arg(dst: number, node: any, defval: any, type:number, context: Context) {

    const name = node.arg;

    let result_type = TYPEID_NotImplementedType;

    const annotation = node.annotation?.id;
    if( annotation !== undefined)
        result_type = context.local_symbols[annotation]; //?

    if( defval !== undefined ) {

        const coffset = addChild(dst, 1);
        convert_node(coffset, defval, context);

        if( result_type === TYPEID_NotImplementedType ) {
            result_type = resultType(coffset);
            if(result_type === TYPEID_jsint)
                result_type = TYPEID_int;
        }
    }

    setType(dst, type);
    setResultType(dst, result_type);

    VALUES[dst] = name;
    context.local_symbols[name] = result_type;

    if( __DEBUG__) set_py_code(dst, node);
}