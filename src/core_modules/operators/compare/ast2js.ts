import { r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";
import { binary_jsop, reversed_operator } from "structs/BinaryOperators";
import { SType_NOT_IMPLEMENTED, STypeFctSubs } from "structs/SType";
import { name2SType } from "structs/STypes";


function find_and_call_substitute(node: ASTNode, left:ASTNode, op: string, right: ASTNode) {
    
    let reversed = false;
    const rtype = right.result_type;
    const ltype = left.result_type;

    let type = SType_NOT_IMPLEMENTED;
    let method = name2SType(left.result_type!)?.[op] as STypeFctSubs;
    if( method !== undefined )
        type = method.return_type(right.result_type!);

    if( type === SType_NOT_IMPLEMENTED) {

        op     = reversed_operator(op as any);
        method = name2SType(right.result_type!)?.[op] as STypeFctSubs;
        if( method !== undefined )
            type   = method.return_type(left.result_type!);
        
        if( type === SType_NOT_IMPLEMENTED) {
            if( op !== '__eq__' && op !== '__ne__' )
                throw new Error(`${ltype} ${op} ${rtype} not implemented!`);

            const jsop = op === '__eq__' ? '===' : '!==';

            return binary_jsop(node, left, jsop, right);
        }

        reversed = true;
        [left, right] = [right, left];
    }

    return method.call_substitute!(node, left, right, reversed);
}

export default function ast2js(this: ASTNode, cursor: CodePos) {
    
    let js = '';
    
    for(let i = 0; i < this.value.length; ++i) {
        if( i !== 0 )
            js += toJS(' && ', cursor);

        const op    = this.value[i];
        const left  = this.children[i];
        const right = this.children[i+1];

        if( op === 'is' ) {
            js += toJS( binary_jsop(this, left, '===', right), cursor);
            continue;
        }
        if( op === 'is not' ) {
            js += toJS( binary_jsop(this, left, '!==', right), cursor);
            continue;
        }

        //TODO: chain...
        
        js += toJS( find_and_call_substitute(this, left, op, right), cursor);
    }

    return js;
}