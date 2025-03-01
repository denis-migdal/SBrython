import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct } from "structs/SType";
import { FUNCTIONS_ARGS } from "core_modules/lists";
import { set_py_code, set_py_from_beg, set_py_from_end } from "ast2js";
import { CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, PY_CODE, VALUES } from "dop";

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

export function convert_args(node: any, SType_fct: STypeFct, context: Context) {

    const meta = SType_fct.__call__;

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

    const args = new Array<ASTNode>(total_args);

    const pos_defaults = node.args.defaults;
    const posonly = _args.posonlyargs;
    const pos     = _args.args;

    // posonly
    let doffset = pos_defaults.length - posonly.length - pos.length;
    for(let i = 0; i < posonly.length; ++i ) {
        const arg = convert_arg(posonly[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POSONLY, context);
        context.local_symbols[posonly[i].arg] = arg.result_type;
        args[i] = arg;
    }

    // pos
    let offset = posonly.length;
      doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i ) {
        const arg = convert_arg(pos[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POS, context);
        
        const name = pos[i].arg;
        context.local_symbols[name] = arg.result_type;
        args_names[offset] = name;

        args[offset++] = arg;
    }

    meta.idx_vararg = offset;

    // vararg
    if( has_vararg ) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;

        const arg = convert_arg(_args.vararg, undefined, FUNCTIONS_ARGS_VARG, context);
        context.local_symbols[_args.vararg.arg] = arg.result_type;
        args[offset++] = arg;
    } else {
        
        meta.idx_end_pos = offset;

        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || args.length !== offset;

        if( nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others)
            meta.idx_end_pos -= nb_pos_defaults;
    }

    let cut_off   = meta.idx_end_pos;
    if( cut_off === Number.POSITIVE_INFINITY)
        cut_off = meta.idx_vararg;
    for(let i = posonly.length; i < cut_off; ++i)
        args_pos[VALUES[args[i].id]] = i;

    const end = meta.idx_vararg - cut_off;
    for(let i = 0; i < end; ++i)
        args_pos[VALUES[args[i].id]] = -1;

    //TODO: idx_end_pos (if default and no idx_vararg)

    // kwonly
    const kwonly      = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;

    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;

    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i ) {
        const arg = convert_arg(kwonly[i], kw_defaults[i], FUNCTIONS_ARGS_KWONLY, context);
        const name = kwonly[i].arg;

        context.local_symbols[name] = arg.result_type;
        args_pos[name] = -1;

        args[offset++] = arg;
    }

    // kwarg
    if( has_kwarg ) {
        const arg = convert_arg(_args.kwarg, undefined, FUNCTIONS_ARGS_KWARG, context);
        const name = _args.kwarg.arg;

        context.local_symbols[name] = arg.result_type;
        args[offset++] = arg;

        meta.kwargs = name;
    }

    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */

    //TODO...

    const ast = new ASTNode(FUNCTIONS_ARGS, 0, args);
    
    ast.type_id = FUNCTIONS_ARGS;
    VALUES[ast.id] = SType_fct;
    
    const py_offset = 4*ast.id;

    if( args.length !== 0) {

        set_py_from_beg( 4*args[0].id            , py_offset );
        set_py_from_end( 4*args[args.length-1].id, py_offset );

    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;

        PY_CODE[ py_offset + CODE_BEG_LINE ] = PY_CODE[ py_offset + CODE_END_LINE ] = node.lineno;
        PY_CODE[ py_offset + CODE_BEG_COL  ] = PY_CODE[ py_offset + CODE_END_COL  ] = col;
    }

    return ast;
}
export function convert_arg(node: any, defval: any, type:number, context: Context) {

    let result_type = node.annotation?.id;
    let children = new Array<ASTNode>();
    if( defval !== undefined ) {

        const child = convert_node( defval,context);
        children.push( child );

        if( result_type === undefined ) {
            result_type = child.result_type;
            if(result_type === 'jsint')
                result_type = 'int';
        }
    }

    const ast = new ASTNode(type, result_type, children);

    VALUES[ast.id] = node.arg;

    set_py_code(4*ast.id, node);

    return ast;
}