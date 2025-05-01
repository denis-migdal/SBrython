import { createASTNode, firstChild, nextSibling, NODE_ID, resultType, setFirstChild, setResultType, setType, type, VALUES } from "@SBrython/sbry/dop";
import { AST_LIT_INT, AST_2BIGINT, AST_2NUMBER } from "@SBrython/sbry/ast2js/list";
import { TYPEID_float, TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types/list";

export type Converter = (node: NODE_ID) => NODE_ID;

export const NOCONVERT = (node: NODE_ID) => node;

export const CONVERT_INT2FLOAT = Int2Number;
export const CONVERT_2INT      = Number2Int;

export function Int2Number(a: NODE_ID, target = TYPEID_float) {

    if( __SBRY_COMPAT__ === "NONE" )
        return a;

    if( resultType(a) !== TYPEID_int) // already a number
        return a;

    if( type(a) === AST_LIT_INT) {
        // if bigint can't safely convert to JSINT.
        if( target === TYPEID_float )
            setResultType(a, TYPEID_jsint);
        return a;
    }

    const a_value = VALUES[a];

    const coffset = firstChild(a);

    if( a_value === '__mul__' || a_value === '__rmul__' ) {
        const ltype = resultType(coffset);
        const rtype = resultType( nextSibling(coffset) );
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
    setType(idx, AST_2NUMBER);
    setFirstChild(idx, a);

    return idx;
}

export function Number2Int(a: NODE_ID) {

    if( __SBRY_COMPAT__ === "NONE" )
        return a;

    if( resultType(a) === TYPEID_int)
        return a;

    if( type(a) === AST_LIT_INT) {
        setResultType(a, TYPEID_int); // force bigint convertion
        return a;
    }
    if( VALUES[a] === '__neg__' && resultType(firstChild(a)) === TYPEID_jsint) {
        setResultType(a, TYPEID_int);
        return a;
    }

    const idx = createASTNode();
    setType(idx, AST_2BIGINT);
    setFirstChild(idx, a);

    return idx;
}