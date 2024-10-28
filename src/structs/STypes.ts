import { STypeObj } from "./SType";

const _name2SType: Record<string,STypeObj> = {}

export function getSType<T extends STypeObj>(name: string): T {
    return (_name2SType[name] ??= {__name__: name}) as T;
}

export function addSType(name: string, type: Omit<STypeObj, '__name__'>) {
    Object.assign( getSType(name), type );
}

export const SType_int                = getSType("int");
export const SType_jsint              = getSType("jsint");
export const SType_float              = getSType("float");
export const SType_bool               = getSType("bool");
export const SType_str                = getSType("str");
export const SType_NoneType           = getSType("NoneType");
export const SType_NotImplementedType = getSType("NotImplementedType");