import { STypeObj } from "./SType";

export const STypes  = new Array<STypeObj>();
const STypename2id: Record<string, number> = {};

export function getSTypeFromName<T extends STypeObj>(name: string): T {
    return STypes[getSTypeID(name)] as T;
}

export function getSTypeID(name: string): number {

    let id = STypename2id[name];
    if( id === undefined ) {
        id = STypename2id[name] = STypes.length;
        STypes[id] = {__name__: name};
    }

    return id;
}

export function addSType(name: string, type: Omit<STypeObj, '__name__'>) {

    const id = getSTypeID(name);
    Object.assign( STypes[id], type );
    return id;
}

export const STYPE_NONETYPE           = getSTypeID("NoneType"); // 0...
export const STYPE_INT                = getSTypeID("int");
export const STYPE_JSINT              = getSTypeID("jsint");
export const STYPE_BOOL               = getSTypeID("bool");
export const STYPE_FLOAT              = getSTypeID("float");
export const STYPE_STR                = getSTypeID("str");
export const STYPE_NOT_IMPLEMENTED    = getSTypeID("NotImplementedType");