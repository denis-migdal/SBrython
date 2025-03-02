import { w, wr } from "ast2js";
import { firstChild, resultType, VALUES } from "dop";
import { binary_jsop, reversed_operator } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";


function find_and_call_substitute(node: number, left:number, op: string, right: number) {
    
    let reversed = false;
    const rtype = resultType(right);
    const ltype = resultType(left);

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[ltype]?.[op] as STypeFctSubs;
    if( method !== undefined )
        type = method.return_type(rtype!);

    if( type === STYPE_NOT_IMPLEMENTED) {

        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        method = STypes[rtype]?.[op] as STypeFctSubs;
        if( method !== undefined )
            type   = method.return_type(ltype!);
        
        if( type === STYPE_NOT_IMPLEMENTED) {
            if( op !== '__eq__' && op !== '__ne__' )
                throw new Error(`${ltype} ${op} ${rtype} not implemented!`);

            const jsop = op === '__eq__' ? '===' : '!==';

            return binary_jsop(node, left, jsop, right);
        }

        reversed = true;
        [left, right] = [right, left];
    }

    return method.substitute_call!(node, left, right, reversed);
}

export default function ast2js(node: number) {
    
    const value = VALUES[node];

    const coffset    = firstChild(node);

    for(let i = 0; i < value.length; ++i) {
        if( i !== 0 )
            w(' && ');

        const op    = value[i];
        const left  = i+coffset;
        const right = i+1+coffset;

        if( op === 'is' ) {
            wr( binary_jsop(node, left, '===', right) );
            continue;
        }
        if( op === 'is not' ) {
            wr( binary_jsop(node, left, '!==', right) );
            continue;
        }
        
        wr( find_and_call_substitute(node, left, op, right) );
    }
}