import { w, wr } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, reversed_operator } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { STYPE_NOT_IMPLEMENTED, STypes } from "structs/STypes";


function find_and_call_substitute(node: ASTNode, left:ASTNode, op: string, right: ASTNode) {
    
    let reversed = false;
    const rtype = right.result_type;
    const ltype = left.result_type;

    let type = STYPE_NOT_IMPLEMENTED;
    let method = STypes[left.result_type]?.[op] as STypeFctSubs;
    if( method !== undefined )
        type = method.return_type(right.result_type!);

    if( type === STYPE_NOT_IMPLEMENTED) {

        op     = reversed_operator(op as Parameters<typeof reversed_operator>[0]);
        method = STypes[right.result_type]?.[op] as STypeFctSubs;
        if( method !== undefined )
            type   = method.return_type(left.result_type!);
        
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

export default function ast2js(node: ASTNode) {
    
    const value = VALUES[node.id];

    for(let i = 0; i < value.length; ++i) {
        if( i !== 0 )
            w(' && ');

        const op    = value[i];
        const left  = node.children[i];
        const right = node.children[i+1];

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