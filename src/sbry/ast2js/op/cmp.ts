// @ts-nocheck

import { w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { w_JSBinOp } from "@SBrython/sbry/structs/operators/binary";
import { TYPEID_int, TYPEID_jsint, TYPEID_NotImplementedType } from "@SBrython/sbry/types/list";

import Types from "@SBrython/sbry/types/list";
import { Fct, RETURN_TYPE, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

function find_and_write_call(node: NODE_ID, left:NODE_ID, op: string, right: NODE_ID) {
    
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

            //TODO... (delete ?)
            w_JSBinOp(node, left, 0, right);

            return;
        }
    }

    method[WRITE_CALL]!(node);
}

function writeOp(node: NODE_ID, cur: NODE_ID, value: string[], count: number): NODE_ID {

    const op    = value[count];
    const left  = cur;
    cur = nextSibling(cur)
    const right = cur;

    if( op === 'is' || op === "is not") {
        let jop = '===';
        if( op === "is not")
            jop = '!==';

        const ltype = resultType(left);
        const rtype = resultType(right);

        let l = left;
        let r = right;

        if( ltype === TYPEID_jsint && rtype === TYPEID_int )
            l = Number2Int(l);
        else if (rtype === TYPEID_jsint && ltype === TYPEID_int )
            r = Number2Int(r);

        //TODO : delete ?
        w_JSBinOp(node, l, 0, r);
    } else {
        find_and_write_call(node, left, op, right);
    }
    return nextSibling(cur);
}

export default function ast2js(node: NODE_ID) {
    
    const value = VALUES[node];

    let cur    = firstChild(node);
 
    cur = writeOp(node, cur, value, 0);

    let count  = 0;
    while( cur !== 0 ) {
        w_str(' && ');
        console.warn(count+1, value);
        cur = writeOp(node, cur, value, ++count);
    }
}