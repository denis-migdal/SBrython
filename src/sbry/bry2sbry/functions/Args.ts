import { Context, convert_node, set_py_code, set_py_from_beg_end } from "@SBrython/sbry/bry2sbry/utils";
import { addFirstChild, addSibling, CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, nextSibling, NODE_ID, NODE_TYPE, PY_CODE, resultType, setResultType, setType, type, TYPE_ID, VALUES } from "@SBrython/sbry/dop";
import TYPES, { TYPEID_int, TYPEID_jsint, TYPEID_NotImplementedType } from "@SBrython/sbry/types/list";
import { ARGS_INFO, Callable, RETURN_TYPE } from "@SBrython/sbry/types/utils/types";
import { AST_DEF_ARG_KWARGS, AST_DEF_ARG_KWONLY, AST_DEF_ARG_POS, AST_DEF_ARG_POSONLY, AST_DEF_ARG_VARARGS, AST_DEF_ARGS } from "@SBrython/sbry/ast2js/list";

//TODO: fake node...
export default function convert() {
    // args node doesn't exist...
    return;
}

convert.brython_name = "arguments";

export function convert_args(dst: NODE_ID, node: any, SType_fct: Callable, context: Context) {

    const meta = SType_fct.__call__[ARGS_INFO]!;

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

    setType(dst, AST_DEF_ARGS);

    let cur!: NODE_ID;
    let first!: NODE_ID;
    let addSblng = (node: NODE_ID) => {
        addSblng = addSibling;
        return first = addFirstChild(dst);
    }

    const pos_defaults = node.args.defaults;
    const posonly = _args.posonlyargs;
    const pos     = _args.args;

    // posonly
    let doffset = pos_defaults.length - posonly.length - pos.length;
    for(let i = 0; i < posonly.length; ++i ) {
        cur = addSblng(cur);
        convert_arg(cur, posonly[i], pos_defaults[i - doffset], AST_DEF_ARG_POSONLY, context);
        context.local_symbols[posonly[i].arg] = resultType(cur);
    }

    // pos
    let offset = posonly.length;
      doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i ) {
        cur = addSblng(cur);
        convert_arg(cur, pos[i], pos_defaults[i - doffset], AST_DEF_ARG_POS, context);
        args_names[offset++] = pos[i].arg;
    }

    meta.idx_vararg = offset;

    // vararg
    if( has_vararg ) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;

        cur = addSblng(cur);
        convert_arg(cur, _args.vararg, undefined, AST_DEF_ARG_VARARGS, context);
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
        args_pos[args_names[i]] = i;

    const end = meta.idx_vararg - cut_off;
    for(let i = 0; i < end; ++i)
        args_pos[args_names[i]] = -1;

    //TODO: idx_end_pos (if default and no idx_vararg)

    // kwonly
    const kwonly      = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;

    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;

    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i ) {

        cur = addSblng(cur);
        convert_arg(cur, kwonly[i], kw_defaults[i], AST_DEF_ARG_KWONLY, context);
        args_pos[kwonly[i].arg] = -1;
        ++offset;
    }

    // kwarg
    if( has_kwarg ) {

        cur = addSblng(cur);
        convert_arg(cur, _args.kwarg, undefined, AST_DEF_ARG_KWARGS, context);
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
    
    if( __SBRY_MODE__ === "dev" ) {
        if( total_args !== 0) {

            set_py_from_beg_end(dst, first, cur);

        } else {
            // an estimation...
            const col = node.col_offset + 4 + node.name.length + 1;

            const py_offset = 4*(dst as number);
            PY_CODE[ py_offset + CODE_BEG_LINE ] = PY_CODE[ py_offset + CODE_END_LINE ] = node.lineno;
            PY_CODE[ py_offset + CODE_BEG_COL  ] = PY_CODE[ py_offset + CODE_END_COL  ] = col;
        }
    }
}
export function convert_arg(dst: NODE_ID, node: any, defval: any, type: NODE_TYPE, context: Context) {

    const name = node.arg;

    let result_type = TYPEID_NotImplementedType;

    const annotation = node.annotation?.id;
    if( annotation !== undefined) {
        const type = TYPES[context.local_symbols[annotation]] as Callable;
        result_type = type.__call__[RETURN_TYPE]()
    }

    if( defval !== undefined ) {

        const coffset = addFirstChild(dst);
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

    if( __SBRY_MODE__ === "dev") set_py_code(dst, node);
}