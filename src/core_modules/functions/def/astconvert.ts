import { Context, convert_body, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct, STypeObj } from "structs/SType";
import { getSType, SType_NoneType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const isMethod = context.type === "class";
    let fct_return_type: null|STypeObj = null;

    const SType_fct: STypeFct = {
        __name__: "function",
        __call__: {
            idx_end_pos    : -1,
            idx_vararg     : -1,
            return_type    : () => fct_return_type!, // ?
            substitute_call: () => "" /* argument parsing */
        }
    }

    if( ! isMethod ) {
        // if method add to self_context.symbols ?
        context.local_symbols[node.name] = SType_fct;
    }

    const annotation = node.returns?.id;
    if( annotation !== undefined)
        fct_return_type = getSType(annotation);
    else {

        //TODO: change search strat...
        //TODO: loops, try, if
        let returns = node.body.filter( (n:any) => n.constructor.$name === "Return" );
        
        // TODO: return;
        if( returns.length === 0)
            fct_return_type = SType_NoneType;
    }

    // new context for the function local variables
    context = new Context("fct", context);

    const args = convert_args(node, SType_fct, context);
    for(let arg of args.children)
        context.local_symbols[arg.value] = arg.result_type;

    const body = convert_body(node, context);

    // recursive.
    if( fct_return_type === null ) {
        //TODO: loop, if, try
        let ret = body.children.filter( n => n.type === "keywords.return");
        fct_return_type = ret[0].result_type!;
    }

    let type = "functions.def";
    if(isMethod)
        type += "(meth)";

    return new ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
}

convert.brython_name = "FunctionDef";

export function convert_args(node: any, SType_fct: STypeFct, context: Context) {

    const meta = SType_fct.__call__;

    const _args = node.args;
    const has_vararg = _args.vararg !== undefined;
    const has_kwarg  = _args.kwarg  !== undefined;

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
        const arg = convert_arg(posonly[i], pos_defaults[i - doffset], "posonly", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[i] = arg;
    }

    // pos
    let offset = posonly.length;
      doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i ) {
        const arg = convert_arg(pos[i], pos_defaults[i - doffset], "pos", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    }

    meta.idx_vararg = offset;

    // vararg
    if( has_vararg ) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;

        const arg = convert_arg(_args.vararg, undefined, "vararg", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    } else {
        
        meta.idx_end_pos = offset;

        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || args.length !== offset;

        if( nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others)
            meta.idx_end_pos -= nb_pos_defaults;
    }


    //TODO: idx_end_pos (if default and no idx_vararg)

    // kwonly
    const kwonly      = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;

    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i ) {
        const arg = convert_arg(kwonly[i], kw_defaults[i], "kwonly", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    }

    // vararg
    if( has_kwarg ) {
        const arg = convert_arg(_args.kwarg, undefined, "kwarg", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    }

    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */

    let virt_node: any;
    if( args.length !== 0) {

        const start = args[0]            .pycode.start;
        const end   = args[args.length-1].pycode.end;

        virt_node = {
            lineno        : start.line,
            col_offset    : start.col,
            end_lineno    : end.line,
            end_col_offset: end.col
        };

    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;

        virt_node = {
                lineno    : node.lineno,
            end_lineno    : node.lineno,
                col_offset: col,
            end_col_offset: col
        }
    }

    return new ASTNode(virt_node, "args", null, SType_fct, args);
}
export function convert_arg(node: any, defval: any, type:string, context: Context) {

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

    return new ASTNode(node, `arg.${type}`, result_type, node.arg, children);
}