import { createASTNode, firstChild, resultType, setFirstChild, setResultType, setType, type, VALUES } from "@SBrython/dop";
import { LITERALS_INT, TO_BIGINT, TO_NUMBER } from "@SBrython/core_modules/lists";
import { TYPEID_float, TYPEID_int, TYPEID_jsint } from "@SBrython/types";

export type Converter = (node: number) => number;

export const NOCONVERT = (node: number) => node;

export const CONVERT_INT2FLOAT = Int2Number;
export const CONVERT_2INT      = Number2Int;

export function Int2Number(a: number, target = TYPEID_float) {

    if( resultType(a) !== TYPEID_int) // already a number
        return a;

    if( type(a) === LITERALS_INT) {
        // if bigint can't safely convert to JSINT.
        if( target === TYPEID_float )
            setResultType(a, TYPEID_jsint);
        return a;
    }

    const a_value = VALUES[a];

    const coffset = firstChild(a);

    if( a_value === '__mul__' || a_value === '__rmul__' ) {
        const ltype = resultType(coffset);
        const rtype = resultType(coffset+1);
        if(    (ltype === TYPEID_int || ltype === TYPEID_jsint)
            && (rtype === TYPEID_int || rtype === TYPEID_jsint)
        ) {
            setResultType(a, target);
            return a;
        }
    }
    if( a_value === '__neg__' && resultType(coffset) === TYPEID_int) {
        setResultType(a, target);
        return a;
    }

    if( target !== TYPEID_float )
        // int -> jsint cast is facultative...
        return a;

    const idx = createASTNode();
    setType(idx, TO_NUMBER);
    setFirstChild(idx, a);

    return idx;
}

export function Number2Int(a: number) {

    if( resultType(a) === TYPEID_int)
        return a;

    if( type(a) === LITERALS_INT) {
        setResultType(a, TYPEID_int); // force bigint convertion
        return a;
    }
    if( VALUES[a] === '__neg__' && resultType(firstChild(a)) === TYPEID_jsint) {
        setResultType(a, TYPEID_int);
        return a;
    }

    const idx = createASTNode();
    setType(idx, TO_BIGINT);
    setFirstChild(idx, a);

    return idx;
}