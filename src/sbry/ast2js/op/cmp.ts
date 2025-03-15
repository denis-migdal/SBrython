import { w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, resultType, VALUES } from "@SBrython/sbry/dop";
import { reversed_operator } from "@SBrython/sbry/structs/BinaryOperators";
import { write_binary_jsop } from "@SBrython/sbry/structs/operators/binary";
import { TYPEID_NotImplementedType } from "@SBrython/sbry/types";

import Types from "@SBrython/sbry/types/list";
import { Fct, RETURN_TYPE, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

function find_and_write_call(node: number, left:number, op: string, right: number) {
    
    let reversed = false;
    const rtype = resultType(right);
    const ltype = resultType(left);

    let type = TYPEID_NotImplementedType;

    let method = Types[ltype][op] as Fct;
    if( method !== undefined )
        type = method[RETURN_TYPE](rtype!);

    if( type === TYPEID_NotImplementedType) {

        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        method = Types[rtype][op] as Fct;
        if( method !== undefined )
            type   = method[RETURN_TYPE](ltype!);
        
        if( type === TYPEID_NotImplementedType) {
            if( __DEBUG__ && op !== '__eq__' && op !== '__ne__' )
                throw new Error(`${ltype} ${op} ${rtype} not implemented!`);

            const jsop = op === '__eq__' ? '===' : '!==';

            write_binary_jsop(node, left, jsop, right);

            return;
        }

        reversed = true;
        [left, right] = [right, left];
    }

    method[WRITE_CALL]!(node, left, right, reversed);
}

export default function ast2js(node: number) {
    
    const value = VALUES[node];

    const coffset    = firstChild(node);

    for(let i = 0; i < value.length; ++i) {
        if( i !== 0 )
            w_str(' && ');

        const op    = value[i];
        const left  = i+coffset;
        const right = i+1+coffset;

        if( op === 'is' ) {
            write_binary_jsop(node, left, '===', right);
            continue;
        }
        if( op === 'is not' ) {
            write_binary_jsop(node, left, '!==', right);
            continue;
        }
        
        find_and_write_call(node, left, op, right);
    }
}