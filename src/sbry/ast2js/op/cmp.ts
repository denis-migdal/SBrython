import { w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { printNode } from "@SBrython/sbry/py2ast";
import { reversed_operator } from "@SBrython/sbry/structs/BinaryOperators";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { write_binary_jsop } from "@SBrython/sbry/structs/operators/binary";
import { TYPEID_int, TYPEID_jsint, TYPEID_NotImplementedType } from "@SBrython/sbry/types";

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
            if( __DEBUG__ && op !== '__eq__' && op !== '__ne__' ) {
                printNode(left);
                printNode(right);
                throw new Error(`${ltype} ${op} ${rtype} not implemented!`);
            }

            const jsop = op === '__eq__' ? '===' : '!==';

            write_binary_jsop(node, left, jsop, right);

            return;
        }

        reversed = true;
        [left, right] = [right, left];
    }

    method[WRITE_CALL]!(node, left, right, reversed);
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


        write_binary_jsop(node, l, jop, r);
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