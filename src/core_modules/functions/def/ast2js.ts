import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { binary_jsop, Number2Int } from "structs/BinaryOperators";
import { STypeFct } from "structs/SType";
import { SType_int } from "structs/STypes";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = '';
    if( ! this.type.endsWith("(meth)") )
        js += toJS('function ', cursor);
    js += toJS(r`${this.value}`, cursor);

    js += args2js(this, cursor);
    js += toJS("{", cursor);
    js += body2js(this, cursor, 1, false);

    const body = this.children[1].children;
    if( body[body.length - 1].type !== "keywords.return" ) {
        js += newline(this, cursor, 1);
        js += "return null;"
    }

    js += newline(this, cursor, 0) + toJS("}", cursor);

    return js;
}



//TODO: move2core_modules ?
export function args2js(node: ASTNode, cursor: CodePos) {
    
    const start = {...cursor};

    const args      = node.children[0];
    const _args     = args.children;
    const SType_fct = args.value! as STypeFct;

    let js = "(";
    cursor.col += 1;

    const meta = SType_fct.__call__;

    let kw_start = meta.idx_end_pos;
    if( kw_start === Number.POSITIVE_INFINITY )
        kw_start = meta.idx_vararg + 1;

    if( meta.kwargs !== undefined && kw_start === _args.length-1)
        ++kw_start;
    
    for(let i = 0 ; i < _args.length; ++i) {
        if( i !== 0) {
            js += ", ";
            cursor.col += 2;
        }

        if( kw_start === i)
            js += toJS('{', cursor);
        if( i === meta.idx_vararg && i === _args.length-1 )
            (_args[i] as any).last = true;

        js += arg2js(_args[i], cursor);
    }

    if( kw_start < _args.length)
        js += toJS('} = {}', cursor);

    js += ")";
    cursor.col += 1;

    args.jscode = {
        start: start,
        end  : {...cursor}
    }

    return js;
}

export function arg2js(node: ASTNode, cursor: CodePos) {
    
    const start = {...cursor};

    if( node.type === "arg.vararg" ) {
        if( (node as any).last)
            return toJS(`...${node.value}`, cursor);
        return toJS( binary_jsop(node, node.value, '=', "[]"), cursor);
    }

    if( node.type === "arg.kwarg" )
        return toJS( binary_jsop(node, node.value, '=', "{}"), cursor);

    if(node.children.length === 1 ) {

        let value: any = node.children[0];
        if( value.result_type === 'jsint' && node.result_type === SType_int)
            value = Number2Int(value);

        return toJS( binary_jsop(node, node.value, '=', value), cursor);
    }

    let js = node.value;
    cursor.col += js.length;

    node.jscode = {
        start: start,
        end  : {...cursor}
    }

    return js;
}