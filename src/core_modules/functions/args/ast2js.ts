import { jscode_cursor, w, wr, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, Number2Int } from "structs/BinaryOperators";
import { STypeFct } from "structs/SType";
import { SType_int } from "structs/STypes";

export default function ast2js(this: ASTNode) {
    
    const args      = this;
    const _args     = args.children;
    const SType_fct = args.value! as STypeFct;

    const meta = SType_fct.__call__;

    let kw_start = meta.idx_end_pos;
    if( kw_start === Number.POSITIVE_INFINITY )
        kw_start = meta.idx_vararg + 1;

    if( meta.kwargs !== undefined && kw_start === _args.length-1)
        ++kw_start;
    
    for(let i = 0 ; i < _args.length; ++i) {
        if( i !== 0)
            w(", ");

        if( kw_start === i)
            w("{");
        if( i === meta.idx_vararg && i === _args.length-1 )
            (_args[i] as any).last = true;

        write_arg(_args[i]);
    }

    if( kw_start < _args.length)
        w('} = {}');
}

function write_arg(node: ASTNode) {
    
    const start = jscode_cursor();

    if( node.type === "arg.vararg" ) {
        if( (node as any).last)
            wt`...${node.value}`;
        else
            wr( binary_jsop(node, node.value, '=', "[]") );
    } else if( node.type === "arg.kwarg" ) {
        wr( binary_jsop(node, node.value, '=', "{}") );
    } else if(node.children.length === 1 ) {

        let value: any = node.children[0];
        if( value.result_type === 'jsint' && node.result_type === SType_int)
            value = Number2Int(value);

        wr( binary_jsop(node, node.value, '=', value) );
    }else {
        w(node.value);
    }

    node.jscode = {
        start: start,
        end  : jscode_cursor()
    }
}