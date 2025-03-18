import { TYPEID_bool, TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_NotImplementedType, TYPEID_str } from "@SBrython/sbry/types";
import { TYPEID_NoneType } from "../types";

export type RETURN_TYPE_FCT = (o: number) => number;

export function RET_None(o: number) {
    return TYPEID_NoneType;
}

export function RET_IJBF2BOOL(o: number) {
    if( TYPEID_int <= o && o <= TYPEID_float)
        return TYPEID_bool;
    return TYPEID_NotImplementedType;
}

export function RET_IJBF2FLOAT(o: number) {
    if( TYPEID_int <= o && o <= TYPEID_float)
        return TYPEID_float;
    return TYPEID_NotImplementedType;
}

export function RET_JSINT2JSINT(o: number) {
    if( o === TYPEID_jsint)
        return TYPEID_jsint;
    return TYPEID_NotImplementedType;
}

export function RET_IJB2INT(o: number) {
    if( o >= TYPEID_int && o <= TYPEID_bool)
        return TYPEID_int;
    return TYPEID_NotImplementedType;
}

export function RET_IJ2INT(o: number) {
    if( o === TYPEID_int || o === TYPEID_jsint)
        return TYPEID_int;
    return TYPEID_NotImplementedType;
}
export function RET_INT2INT(o: number) {
    if( o === TYPEID_int)
        return TYPEID_int;
    return TYPEID_NotImplementedType;
}

export function RET_STR2BOOL(o: number) {
    if( o === TYPEID_str )
        return TYPEID_bool;
    return TYPEID_NotImplementedType;
}
export function RET_STR2STR(o: number) {
    if( o === TYPEID_str )
        return TYPEID_str;
    return TYPEID_NotImplementedType;
}
export function RET_IJ2STR(o: number) {
    if( o === TYPEID_int || o === TYPEID_jsint )
        return TYPEID_str;
    return TYPEID_NotImplementedType;
}

export function RET_FLOAT(_: number) { return TYPEID_float; }
export function RET_INT  (_: number) { return TYPEID_int;   }
export function RET_JSINT(_: number) { return TYPEID_jsint; }
export function RET_STR  (_: number) { return TYPEID_str;   }