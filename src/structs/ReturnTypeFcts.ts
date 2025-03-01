import { STYPE_NOT_IMPLEMENTED, STYPE_BOOL, STYPE_FLOAT, STYPE_INT, STYPE_STR, STYPE_JSINT } from "./STypes";

export type RETURN_TYPE_FCT = (o: number) => number;

export function RET_IJBF2BOOL(o: number) {
    if( STYPE_INT <= o && o <= STYPE_FLOAT)
        return STYPE_BOOL;
    return STYPE_NOT_IMPLEMENTED;
}

export function RET_IJBF2FLOAT(o: number) {
    if( STYPE_INT <= o && o <= STYPE_FLOAT)
        return STYPE_FLOAT;
    return STYPE_NOT_IMPLEMENTED;
}

export function RET_JSINT2JSINT(o: number) {
    if( o === STYPE_JSINT)
        return STYPE_JSINT;
    return STYPE_NOT_IMPLEMENTED;
}

export function RET_IJ2INT(o: number) {
    if( o === STYPE_INT || o === STYPE_JSINT)
        return STYPE_INT;
    return STYPE_NOT_IMPLEMENTED;
}
export function RET_INT2INT(o: number) {
    if( o === STYPE_INT)
        return STYPE_INT;
    return STYPE_NOT_IMPLEMENTED;
}

export function RET_STR2BOOL(o: number) {
    if( o === STYPE_STR )
        return STYPE_BOOL;
    return STYPE_NOT_IMPLEMENTED;
}
export function RET_STR2STR(o: number) {
    if( o === STYPE_STR )
        return STYPE_STR;
    return STYPE_NOT_IMPLEMENTED;
}
export function RET_IJ2STR(o: number) {
    if( o === STYPE_INT || o === STYPE_JSINT )
        return STYPE_STR;
    return STYPE_NOT_IMPLEMENTED;
}

export function RET_FLOAT(_: number) { return STYPE_FLOAT; }
export function RET_INT  (_: number) { return STYPE_INT;   }
export function RET_JSINT(_: number) { return STYPE_JSINT; }
export function RET_STR  (_: number) { return STYPE_STR;   }

//TODO...
export function generate_return_type() {

}