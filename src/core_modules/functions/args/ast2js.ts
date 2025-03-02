import { set_js_cursor, w, wr, wt } from "ast2js";
import { CODE_END, VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, Number2Int } from "structs/BinaryOperators";
import { STypeFct } from "structs/SType";
import { STYPE_INT, STYPE_JSINT } from "structs/STypes";
import { FUNCTIONS_ARGS_KWARG, FUNCTIONS_ARGS_VARG } from "./astconvert";

export default function ast2js(node: ASTNode) {
    
    const args      = node;
    const _args     = args.children;
    const SType_fct = VALUES[args.id]! as STypeFct;

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

        const isLast = i === meta.idx_vararg && i === _args.length-1;
        write_arg(_args[i], isLast);
    }

    if( kw_start < _args.length)
        w('} = {}');
}

function write_arg(node: ASTNode, isLast: boolean) {
    
    const offset = 4*node.id;
    set_js_cursor(offset + CODE_END);

    const name = VALUES[node.id];

    if( node.type_id === FUNCTIONS_ARGS_VARG ) {
        if( isLast )
            wt`...${name}`;
        else
            wr( binary_jsop(node, name, '=', "[]") );
    } else if( node.type_id === FUNCTIONS_ARGS_KWARG ) {
        wr( binary_jsop(node, name, '=', "{}") );
    } else if(node.children.length === 1 ) {

        let value: any = node.children[0];
        if( value.result_type === STYPE_JSINT && node.result_type === STYPE_INT)
            value = Number2Int(value);

        wr( binary_jsop(node, name, '=', value) );
    }else {
        w(name);
    }

    set_js_cursor(offset + CODE_END);
}